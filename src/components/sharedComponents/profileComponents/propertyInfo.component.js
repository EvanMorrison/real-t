import template from './propertyInfo.template.html';

export default function(app) {
  app.component('rtPropertyInfo', {
    template,
    controller: [ 'caseService', PropertyInfoController],
    controllerAs: 'vm',
    transclude: true,
    bindings: {
      profile: '<',
      mode: '<',
      section: '<',
      'actions': '<',
      onSaveClick: '&'
    }
  })

  function PropertyInfoController(caseService) {
    const vm = this;
    // vm.statesList = caseService.statesList

      vm.$onChanges = (changes) => {
        if (changes.profile) {
          let profile = changes.profile; // SimpleChanges class object
          if (profile.currentValue) {
            vm.states = null;
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

      vm.loadStates = () => {
        vm.states = caseService.statesList;
      }
      

      // county selection input options
        vm.Counties = ["Beaver", "Box Elder", "Cache", "Carbon", "Daggett", "Davis", "Duchesne", "Emery", "Garfield", "Grand", "Iron", "Juab", "Kane", "Millard", "Morgan", "Piute", "Rich", "Salt Lake", "San Juan", "Sanpete", "Sevier", "Summit", "Tooele", "Uintah", "Utah", "Wasatch", "Washington", "Wayne", "Weber"]
  


  }
}
