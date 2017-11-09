
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
      vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
          

          

  }

}
