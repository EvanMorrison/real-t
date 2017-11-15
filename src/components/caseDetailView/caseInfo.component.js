module.exports = function(app) {
  app.component('rtCaseInfo', {
    template: require('./caseInfo.template.html'),
    controller: [ DetailsController],
    controllerAs: 'vm',
    bindings: {
                  sections: '<',
                  props: '<',
                  caseRecord: '<',
                  onToggleDisplayNames: '&',
    }
  })

  function DetailsController() {
    const vm = this;
    
    
    vm.toggleDisplayNames = (profile, section) => {
      vm.onToggleDisplayNames({profile, path: 'people', section});
    }

    
  }
}