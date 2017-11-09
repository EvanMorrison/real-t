module.exports = function(app) {
  app.component('propertyCard', {
    template: require('./propertyCard.template.html'),
    controller: [
                  PropertyCardController
    ],
    controllerAs: 'vm',
    bindings: {
                'property': '<',
                'showEdit': '<',
                'category': '@',
                'onEditClick': '&'
    }
  })

  function PropertyCardController() {
    const vm = this;
    vm.isActiveEdit = false;
    

    vm.handleEditClick = function() {
      vm.isActiveEdit = !vm.isActiveEdit;
      vm.onEditClick();
    }

    // county selection input options
      vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
  }

}