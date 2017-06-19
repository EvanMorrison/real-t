(function() {
  'use strict'

  angular.module('Cases', [

  ])
    .component('cases', {
      templateUrl: 'components/cases/cases.template.html',
      controller: ['caseService', CasesController],
      controllerAs: 'ctrl',
      bindings: { cases : '<'},
    });

    function CasesController(caseService) {
      const ctrl = this;
        ctrl.caseSelected = false;

        ctrl.$onDestroy = function() { 
          console.log('destroyer')
          ctrl.selectedFile = 0; 
        }
        
        ctrl.$onUpdate = function() {
          console.log('selected ', ctrl.caseSelected)
        }


      // track which case the user has selected to view details
      ctrl.selected = function(c) {
        if (c.file === ctrl.selectedFile) {
          ctrl.selectedFile = 0;
        } else {
        ctrl.selectedFile = c.file;
        }
      }

    }
})();
