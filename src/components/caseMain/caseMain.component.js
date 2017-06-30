(function() {

  

  angular.module('CaseMain', [])
    .config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  })

  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: ['caseService', '$state', '$stateParams', CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'caseList': '<'}
  });

    function CaseMainController(caseService, $state, $stateParams) {
          const ctrl = this;
          ctrl.isActiveEdit = false
          ctrl.isCaseIdValid = true;
          const findCaseId = null;

          ctrl.$onInit = function() {
            console.log('case list ', ctrl.caseList)
            if ($stateParams.caseId) {
              console.log('stateParams ', $stateParams)
              ctrl.caseId = $stateParams.caseId
              ctrl.caseLookup(ctrl.caseId)
            } 
          }


          // lookup case by caseId 
          ctrl.caseLookup = function(searchId) {
            
            ctrl.caseRecord =  ctrl.caseList.find(function(elm) {
              console.log('array element ', elm.$id, ' case id ', elm.caseId)
              return elm.caseId === searchId
            })
            console.log('case record found ', ctrl.caseRecord)
                if (ctrl.caseRecord) {
                  ctrl.isCaseIdValid = true;
                } else {
                    ctrl.isCaseIdValid = false;
                }
            
            $state.go('caseMain.caseXV', {caseId: searchId})
          }

           // save edits to case info
          ctrl.saveChanges = function() {
              // convert dates to strings for JSON format in database
              if (ctrl.caseRecord.loan && ctrl.caseRecord.loan.DOT && ctrl.caseRecord.loan.DOT.recorded) {
                  ctrl.caseRecord.loan.DOT.recorded = ctrl.caseRecord.loan.DOT.recorded.toString()
              }
              if (ctrl.caseRecord.loan && ctrl.caseRecord.loan.assignments) {
                  angular.forEach(ctrl.caseRecord.loan.assignments, function(val, key) {
                    if (val['recorded']) { 
                      val['recorded'] = val['recorded'].toString()
                    }
                  })
              }
            
              ctrl.caseList.$save(ctrl.caseRecord).then(function(ref) {
                ctrl.isActiveEdit = !ctrl.isActiveEdit;
                console.log('changes saved successfully for ', ref.key)
              })
              .catch(function(err) {
                console.log('error saving changes ', err)
              })
          }

          // cancel edits restore original data
          ctrl.cancelChanges = function() {
            console.log('caserecord id ', ctrl.caseRecord.$id)
            console.log('original caserecord ', ctrl.caseList.$getRecord(ctrl.caseRecord.$id))
            ctrl.isActiveEdit = !ctrl.isActiveEdit;
            let recordId = ctrl.caseRecord.$id;
            ctrl.caseRecord = null;
            // ctrl.caseRecord = ctrl.caseList.$getRecord(recordId);

          }
          
          
    }


})();
