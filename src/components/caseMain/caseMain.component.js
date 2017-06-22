(function() {

  angular.module('CaseMain', [])
  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: [CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'case': '<'}
  });

    function CaseMainController() {
      const ctrl = this;

    }


})();
