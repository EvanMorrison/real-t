
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
                'onEditClick': '&'
    }
  })

  function PersonCardController(phoneFilter) {
    const vm = this;
    vm.isActiveEdit = false;
    
    vm.handleEditClick = function($event) {
      vm.isActiveEdit = !vm.isActiveEdit;
      vm.onEditClick();
    }




  }

}