
(function() {
  'use strict'

  angular.module('CaseList', [ ])
    .component('caseList', {
      templateUrl: 'components/caseList/caseList.template.html',
      controller: ['$state', 'caseService', '$firebaseAuth', CasesController],
      controllerAs: 'ctrl',
      bindings: { caseList : '<'},
    });

    function CasesController($state, caseService, $firebaseAuth) {
      const ctrl = this;

      ctrl.orderProp = 'caseId';


      // toggle parent or child state depending on what is currently showing
      ctrl.toggleSelected = function(index) {
          if (ctrl.selectedCase === index) {
            ctrl.selectedCase = null;
            } else {
              ctrl.selectedCase = index;
            }
      }

      // delete a case from the database and the local firebaseArray    
      ctrl.deleteCase = function(caseObj) {
        if (window.confirm('Click Ok to Permanently Delete case ' + caseObj.caseId)) {
              ctrl.caseList.$remove(caseObj)
              .then(function(ref) {
                console.log("ref.$id ", ref.key);
              })
        }
      }

      ctrl.gotoCase = function (caseObj) {
          $state.go('caseMain.caseXV', {caseId: caseObj.caseId})
      }

    }


})();
