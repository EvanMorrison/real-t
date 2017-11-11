
module.exports = function(app) {
  app.component('personCard', {
    template: require('./personCard.template.html'),
    controller: [
                  'phoneFilter',
                  PersonCardController
    ],
    controllerAs: 'vm',
    bindings: {
                'person': '<',
                'showEdit': '<',
                'category': '@',
                'onEditClick': '&',
                'onSaveClick': '&',
                'toggleCard': '&',
    }
  })

  function PersonCardController(phoneFilter) {
    const vm = this;
    vm.isActiveEdit = false;
    vm.saved = true;
    
    vm.$onChanges = () => {
      let displayName = `${(vm.person.nickName || vm.person.firstName)} ${vm.person.lastName}`;
      vm.person.displayName = displayName;
    }

    vm.handleEditClick = $event => {
      vm.isActiveEdit = !vm.isActiveEdit;
      vm.onEditClick();
    }

    vm.update = () => {
      vm.saved = false;
    }
    vm.handleSaveClick = $event => {
      console.log('person ', vm.person)
      vm.person.fullName = `${vm.person.firstName} ${vm.person.lastName}`;;
      vm.onSaveClick({data: vm.person, category: vm.category});
      vm.saved = true;
      vm.handleEditClick();
      vm.toggleCard({$event: $event, category: vm.category});
    }



  }

}