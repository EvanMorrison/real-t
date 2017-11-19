module.exports = function(app) {
  app.component('rtPersonInfo', {
    template: require('./personInfo.template.html'),
    controller: [ '$mdDialog', PersonInfoController],
    controllerAs: 'vm',
    bindings: {
                  person: '<',
                  mode: '<',
                  category: '<',
                  onSaveClick: '&',
      }
    
  })

    function PersonInfoController($mdDialog) {
      // controller level variables
        const vm = this;
        vm.saved = true;
        vm.new = true;
        vm.teltypes = ['mobile', 'office', 'home', 'custom'];
        vm.states = require('../stateList');
        vm.labels = {type: 'Organization'}

        vm.$onInit = () => {
          vm.person = { type: 'organization' };
          if (vm.category.toLowerCase().indexOf('attorney') != -1) vm.person.type = 'attorney';
          vm.setInputLabels();
        }
        // 
        vm.$onChanges = (changesObj) => { 
          if (changesObj.person) {
            vm.saved = false;
          }
          if (!changesObj.person || !changesObj.person.currentValue || !changesObj.person.currentValue._id) {
            vm.teltypes = ['mobile', 'office', 'home', 'custom'];
          }
          else {
            let person = changesObj.person;
            if (person.previousValue == null || person.currentValue._id !== person.previousValue._id) {
                if (Array.isArray(vm.person.phones)) {
                  for (let tel of vm.person.phones) {
                    if (tel.type != null && !vm.teltypes.includes(tel.type)) vm.teltypes.push(tel.type);
                }
              }
            }
          }
          
        }

        // apply correct labels for inputs based on type of contact
        vm.setInputLabels = () => {
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

        // allow for custom input on phone number type
        vm.setPhoneLabel = ($event, $index) => {
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
          vm.saved = false;
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

        vm.handleSaveClick = $event => {
          vm.onSaveClick({data: vm.person});
          vm.saved = true;
          vm.new = false;
        }
      
    }
  
}
