
(function() {
  'use strict'

  angular.module('Cases', [

  ])
    .component('cases', {
      templateUrl: 'components/cases/cases.template.html',
      controller: ['$state', 'caseService', CasesController],
      controllerAs: 'ctrl',
      bindings: { caseList : '<'},
    });

    function CasesController($state, caseService) {
      const ctrl = this;
      ctrl.$onInit = function() {
        console.log('cases ', ctrl.caseList)
      }
      // toggle parent or child state depending on what is currently showing
      ctrl.toggleSelected = function(index) {
          if (ctrl.selectedCase === index) {
            $state.go('cases')
            ctrl.selectedCase = null;
            } else {
              $state.go('cases.case', {caseId: ctrl.caseList[index].$id})
              ctrl.selectedCase = index;
            }
      }

      ctrl.gotoCase = function (index) {
        console.log('case id ', ctrl.caseList[index].$id )
          $state.go('caseMain', {directId: ctrl.caseList[index].$id})
      }

    }
})();
