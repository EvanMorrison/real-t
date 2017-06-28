(function() {

  

  angular.module('CaseMain', [])
    .config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  })

  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: ['caseService', '$state', '$stateParams', CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'caseRecord': '<'}
  });

    function CaseMainController(caseService, $state, $stateParams) {
          const ctrl = this;
          ctrl.isActiveEdit = false
          ctrl.isCaseIdValid = true;
          const findCaseId = null;

          ctrl.$onInit = function() {
              console.log('params ', $stateParams)
            if ($stateParams.directId) {
              ctrl.caseLookup($stateParams.directId);
            }
            // if ($stateParams.caseId) {
            //     ctrl.caseLookup($stateParams.caseId)
            // }
          }


          // lookup case by caseId 
          ctrl.caseLookup = function(searchId) {
            console.log('looking for ', searchId)
            caseService.getFullCase(searchId)
            .$loaded(function(snap){
                ctrl.caseRecord = snap;
                if (snap.$value === undefined) {
                  ctrl.isCaseIdValid = true;
                } else {
                    ctrl.isCaseIdValid = false;
                }
            })
            $state.go('caseMain.caseXV', {caseId: searchId})
          }

           // save edits to case info
          ctrl.saveChanges = function() {
              // convert dates to strings for JSON format in database
              ctrl.caseRecord.loan.DOT.recorded = ctrl.caseRecord.loan.DOT.recorded.toString()
              angular.forEach(ctrl.caseRecord.loan.assignments, function(val, key) {
                if (val['recorded']) { 
                  val['recorded'] = val['recorded'].toString()
                }
              })
            
              ctrl.caseRecord.$save().then(function(ref) {
                ctrl.isActiveEdit = !ctrl.isActiveEdit;
              })
          }

          // cancel edits restore original data
          ctrl.cancelChanges = function() {
            ctrl.case = caseService.getFullCase(ctrl.searchId);
            ctrl.isActiveEdit = !ctrl.isActiveEdit;
          }

         
         
          
          
    }


})();
