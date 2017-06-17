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

        ctrl.$onDestroy = function() { 
          console.log('destroyer')
          ctrl.selectedFile = 0; 
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
