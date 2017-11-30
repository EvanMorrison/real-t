module.exports = function(app) {
  app.component('rtPersonInfo', {
    template: require('./personInfo.template.html'),
    controller: [ 'caseService', '$timeout', '$mdDialog', '$scope', PersonInfoController],
    transclude: true,
    controllerAs: 'vm',
    bindings: {
                  profile: '<',
                  mode: '<',
                  actions: '<',
                  onSaveClick: '&'
      }
    
  })

    function PersonInfoController(caseService, $timeout, $mdDialog, $scope) {
      // controller level variables
        const vm = this;
        
        vm.$onDestroy = () => {
          
        }
        vm.$onInit = () => {
          
          vm.setInputLabels();
        }

        // handles adding or resetting phone types to selector options to accomodate custom labels
        vm.$onChanges = (changes) => { 
          if (changes.profile) {
            let profile = changes.profile; // SimpleChanges class object
            if (profile.currentValue) {
              vm.states = null;
              vm.person = JSON.parse(JSON.stringify(profile.currentValue));
              vm.client = vm.profile.client;
              vm.role = vm.profile.role;
              vm.person.phones = vm.getPhoneList(); // these add an empty phone/email entry for ngrepeat to display... 
              vm.person.emails = vm.getEmailList(); // if there are no phone/emails or if user selects to add one
              vm.teltypes = ['mobile', 'office', 'home', 'custom'];
              // if existing profile has custom tel types, add them to the selector options list
              for (let tel of vm.person.phones) {
                if (tel.type && !vm.teltypes.includes(tel.type)) vm.teltypes.push(tel.type);
              }
            }
          }

          if (changes.actions) {
            let actions = changes.actions;
            if (actions.currentValue && actions.currentValue.save === true && actions.previousValue.save === false) {
              vm.removeBlankPhoneAndEmail();
              vm.onSaveClick({ profile: vm.person });
            }
          } 
          
          if (changes.mode) {
            if (changes.mode.currentValue === 'edit') vm.statesList = caseService.statesList;
            else vm.statesList = null;
          }
        }
        
        // load states list for md-select
        vm.loadStates = () => {
          vm.states = caseService.statesList;
        }


        // provide a default for ng-repeat when there are not yet any phones
        vm.getPhoneList = () => {
          if (!vm.person.phones || vm.person.phones.length === 0) return [{ type: null, value: null}];
          else return vm.person.phones;
        }
        // provide a default for ng-repeat when there are not yet any emails
        vm.getEmailList = () => {
          if (!vm.person) return null;
          if (!vm.person.emails || vm.person.emails.length === 0) return [{ value: null}];
          else return vm.person.emails;
        }
        vm.addPhone = () => {
          vm.person.phones.push({ value: null, type: null})
        }
        vm.addEmail = () => {
          vm.person.emails.push({value: null})
        }

        vm.removeBlankPhoneAndEmail = () => {
          let last = vm.person.phones.length - 1;
          if (vm.person.phones[last].value == null) vm.person.phones.pop();
          last = vm.person.emails.length - 1;
          if (vm.person.emails[last].value == null) vm.person.emails.pop();
        }
        vm.deletePhone = ($index) => {
          if ($index === 0 && vm.person.phones[0].value == null && vm.person.phones.length === 1) return;
          vm.person.phones.splice($index, 1);

        }
        vm.deleteEmail = ($index) => {
          if ($index === 0 && vm.person.emails[0].value == null && vm.person.emails.length === 1) return;
          vm.person.emails.splice($index, 1);
        }
        // apply specified labels for inputs based on type of contact
        vm.setInputLabels = () => {
          if (!vm.person) return;
          let labels = { };
          switch (vm.person.type) {
            case 'attorney':
              labels.org = 'law firm';
              labels.person = 'attorney';
              labels.type = 'Law Firm'
              break;
            case 'organization':
              labels.org = 'company';
              labels.person = 'contact';
              labels.type = 'Organization';
              break;
            case 'trust':
              labels.org = 'trust';
              labels.person = 'trustee';
              labels.type = 'Trust';
              break;
            case 'individual':
              labels.person = 'person';
              break;
          }
          vm.labels = labels;
        }

        // dialog box for custom input on phone number type
        vm.setPhoneLabel = ($event, $index) => {
          if (!$index || !vm.person.phones) return;
          if (vm.person.phones[$index].type === 'custom') {  
            let prompt = $mdDialog.prompt()
              .title('Cutom Phone Label')
              .placeholder('eg., mobile2')
              .ariaLabel('custom phone label')
              .targetEvent($event)
              .ok('ok')
              .cancel('cancel')
            
              $mdDialog.show(prompt)
              .then(result => {
                vm.teltypes.push(result);
                vm.person.phones[$index].type = result})
              .catch(cancel => vm.person.phones[$index].type = '')
          }
        }


        vm.updateDisplayName = (nameType) => {
          let { displayName, fullName, firstName, lastName, shortName, shortOrgName, fullOrgName, orgDisplayName } = vm.person;
          if (nameType === 'individual') {
            if (displayName == fullName) {
              displayName = `${shortName || firstName} ${lastName}`;
            }
            else displayName = fullName;
            let profile = { _id: vm.person._id, displayName }
            vm.onSaveClick({ profile });
          } else if (nameType === 'org') {
            if (orgDisplayName == fullOrgName) orgDisplayName = `${shortOrgName || fullOrgName}`
            else orgDisplayName = fullOrgName
            let profile = { _id: vm.person._id, orgDisplayName }
            vm.onSaveClick({ profile });
          }
        }

        vm.updateName = () => {
          if (vm.person._id == 'new') {
            vm.person.fullName = `${vm.person.firstName || ''} ${vm.person.lastName || ''}`;
          }
          if (vm.person._id == 'new') {
            vm.person.displayName = `${vm.person.firstName || ''} ${vm.person.lastName || ''}`;
          }
        }

        vm.setDisplayName = () => {
            vm.person.displayName = `${vm.person.shortName || vm.person.firstName || ''} ${vm.person.lastName || ''}`;
            vm.person.orgDisplayName = vm.person.shortOrgName || vm.person.fullOrgName;
        }

      
    }
  
}
