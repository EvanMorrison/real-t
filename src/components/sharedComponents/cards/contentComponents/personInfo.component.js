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

        // 
        vm.$onChanges = (changesObj) => {
          if (changesObj.person) {
            vm.saved = false;
          }
          if (!changesObj.person.currentValue || !changesObj.person.currentValue._id) {
            vm.teltypes = ['mobile', 'office', 'home', 'custom'];
          }
          else {
            let person = changesObj.person;
            if (person.previousValue == null || person.currentValue._id !== person.previousValue._id) {
              console.log('changes obj ', changesObj);
                if (Array.isArray(vm.person.phones)) {
                  for (let tel of vm.person.phones) {
                    console.log('tel ', tel, ' tel.type ', tel.type);
                    if (tel.type != null && vm.teltypes.indexOf(tel.type) === -1) vm.teltypes.push(tel.type);
                }
              }
            }
          }
          
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
                console.log('phone label ', result)
                vm.teltypes.push(result);
                vm.person.phones[$index].type = result})
              .catch(cancel => vm.person.phones[$index].type = '')
          }
        }


        vm.update = () => {
          vm.saved = false;
        }

        vm.updateName = () => {
          if (vm.new || vm.fullName == null ) {
            vm.person.fullName = `${vm.person.firstName || ''} ${vm.person.lastName || ''}`
          }
          if (vm.shortName) {
            vm.displayName = vm.displayName || `${vm.displayName} ${vm.lastName}` || vm.fullName;
          } else if (vm.fullName) {
            vm.displayName = vm.displayName || vm.fullName;
          }
        }

        vm.handleSaveClick = $event => {
          vm.onSaveClick({data: vm.person});
          vm.saved = true;
          vm.new = false;
        }
      
    }
  
}
