module.exports = function(app) {
  app.component('rtPropertyInfo', {
    template: require('./propertyInfo.template.html'),
    controller: [ PropertyInfoController],
    controllerAs: 'vm',
    transclude: true,
    bindings: {
                    profile: '<',
                    mode: '<',
                    section: '<',
                    statesList: '<',
                    'actions': '<',
                    onSaveClick: '&'
    }
  })

  function PropertyInfoController() {
    const vm = this;

      vm.$onChanges = (changes) => {
        if (changes.profile) {
          let profile = changes.profile; // SimpleChanges class object
          if (profile.currentValue) {
            vm.property = JSON.parse(JSON.stringify(profile.currentValue));
          }
        }
        if (changes.actions) {
          let actions = changes.actions;
          if (actions.currentValue && actions.currentValue.save === true && actions.previousValue.save === false) {
            vm.onSaveClick({profile: vm.property});
          }
        } 
      }

      vm.update = () => {
      }

      

      // county selection input options
        vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
  


  }
}
