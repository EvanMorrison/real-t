(function() {
  'use strict'

  angular.module('Cases', [

  ])
    .component('cases', {
      templateUrl: 'components/cases/cases.template.html',
      controller: ['$state', 'caseService', CasesController],
      controllerAs: 'ctrl',
      bindings: { cases : '<'},
    });

    function CasesController($state, caseService) {
      const ctrl = this;

      // toggle parent or child state depending on what is currently showing
      ctrl.toggleSelected = function(index) {
          if (ctrl.selectedCase === index) {
            $state.go('cases')
            ctrl.selectedCase = null;
            } else {
              $state.go('cases.case', {fileId: ctrl.cases[index].file})
              ctrl.selectedCase = index;
            }
      }

    }
})();
