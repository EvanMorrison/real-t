module.exports = function(app) {
  app.component('rtPropertyInfo', {
    template: require('./propertyInfo.template.html'),
    controller: [ PropertyInfoController],
    controllerAs: 'vm',
    bindings: {
                  'property': '<',
                  'mode': '<',
                  'onSaveClick' : '&'
    }
  })

  function PropertyInfoController() {
    const vm = this;
    vm.saved = true;

      vm.update = () => {
        vm.saved = false;
      }

      vm.handleSaveClick = $event => {
        vm.onSaveClick({data: vm.property, path: 'property'});
        vm.saved = true;
      }  

      // county selection input options
        vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
  


  }
}
