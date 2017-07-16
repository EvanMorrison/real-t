module.exports = function(app) {
  app
  .component('newCase', {
    template: require('./newCase.template.html'),
    controller: [ 
                  '$state',
                  NewCaseController
                ],
    controllerAs: 'vm',
    bindings: {
                'newcase': '<',
                'isCreating': '<',
                'onCancel': '&',
                'onFinalize': '&',
                'onUpdate': '&'
    }
  });

  function NewCaseController($state) { 
    const vm = this;
    
    vm.viewTitle = 'Case View & Edit Dashboard'

    vm.$onInit = function() {
      if (!vm.isCreating) {
        $state.go('caseDashboard');
      }
    }

    vm.cancel = function() {
      vm.onCancel();
    }

    vm.finalize = function() {
      vm.onFinalize();
    }

  }

}