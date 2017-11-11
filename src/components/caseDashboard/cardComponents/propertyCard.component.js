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
                'onEditClick': '&',
                'onSaveClick': '&',
                'toggleCard' : '&'
    }
  })

  function PropertyCardController() {
    const vm = this;
    vm.isActiveEdit = false;
    vm.saved = true;
    
    vm.handleEditClick = $event => {
      vm.isActiveEdit = !vm.isActiveEdit;
      vm.onEditClick();
    }

    vm.update = () => {
      vm.saved = false;
    }

    vm.handleSaveClick = $event => {
      vm.onSaveClick({data: vm.property, category: vm.category});
      vm.saved = true;
      vm.handleEditClick();
      vm.toggleCard({$event: $event, category: vm.category});
    }  

    // county selection input options
      vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
  }

}