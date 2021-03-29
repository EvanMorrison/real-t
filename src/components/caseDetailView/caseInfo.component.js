import template from './caseInfo.template.html';

export default function(app) {
  app.component('rtCaseInfo', {
    template,
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
