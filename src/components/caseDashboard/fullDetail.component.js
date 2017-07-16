
module.exports = function(ngModule) {
  ngModule
  .component('fullDetail', {
    template: require('./fullDetail.template.html'),
    controller: [ '$stateParams',
                  FullDetailController
                ],
    controllerAs: 'vm',
    bindings: { case: '<',
                isActiveEdit: '<',
                isCreating: '<',
                onUpdate: '&',
                onExit: '&',
                onCaseSelected: '&'
              }
  })

  function FullDetailController($stateParams) {
    const vm = this;
    vm.$onInit = function() {
      if ($stateParams.recordId) {
        vm.onCaseSelected({id: $stateParams.recordId})
      }
    }
    
    vm.update = function() {
        vm.onUpdate()
    }

    vm.$onDestroy = function() {
      vm.onExit();
    }

        // county selection input options
      vm.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]
          

          

  }

}
