module.exports = function(app) {
  app.component('rtPersonInfo', {
    template: require('./personInfo.template.html'),
    controller: [ 'caseService', '$mdDialog', '$scope', PersonInfoController],
    transclude: true,
    controllerAs: 'vm',
    bindings: {
                  profile: '<',
                  mode: '<',
                  section: '<',
                  'actions': '<',
                  onSaveClick: '&'
      }
    
  })

    function PersonInfoController(caseService, $mdDialog, $scope) {
      // controller level variables
        const vm = this;
        vm.saved = true;
        vm.new = true;
        vm.statesList = caseService.statesList;

        vm.$onDestroy = () => {
          vm.profiles = null;
          vm.actions = null;
          vm.onSaveClick = null;
        }
        vm.$onInit = () => {
          if (vm.person && vm.section.indexOf('Attorney') != -1) vm.person.type = 'attorney';
          vm.setInputLabels();
        }

        // handles adding or resetting phone types to selector options to accomodate custom labels
        vm.$onChanges = (changes) => { 
          if (changes.profile) {
            let profile = changes.profile; // SimpleChanges class object
            if (profile.currentValue) {
              vm.person = JSON.parse(JSON.stringify(profile.currentValue));
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
              vm.onSaveClick({profile: vm.person});
            }
          } 
          
          if (changes.mode) {
            if (changes.mode.currentValue === 'edit') vm.statesList = caseService.statesList;
            else vm.statesList = null;
          }
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


        vm.update = () => {

        }

        vm.updateName = () => {
          if (vm.new || vm.person.fullName == null ) {
            vm.person.fullName = `${vm.person.firstName || ''} ${vm.person.lastName || ''}`;
          }
          if (vm.person.displayName == null) {
            vm.person.displayName = `${vm.person.firstName || ''} ${vm.person.lastName || ''}`;
          }
        }

        vm.setDisplayName = () => {
            vm.person.displayName = `${vm.person.shortName || vm.person.firstName || ''} ${vm.person.lastName || ''}`;
            vm.person.orgDisplayName = vm.person.shortOrgName || vm.person.fullOrgName;
        }

      
    }
  
}
