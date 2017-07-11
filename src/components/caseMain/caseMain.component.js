  
module.exports = function(ngModule) {
  ngModule
    .config(['$compileProvider', function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  }])

  .component('caseMain', {
    template: require('./caseMain.template.html'),
    controller: [ 'caseService', 
                  '$state', 
                  '$stateParams', 
                  '$mdToast', 
                  CaseMainController
                ],
    controllerAs: 'ctrl',
    bindings: { 'caseList': '<'}
  });

    function CaseMainController(caseService, $state, $stateParams, $mdToast) {
          const ctrl = this;
          ctrl.isActiveEdit = false
          ctrl.isCaseIdValid = true;
          const findCaseId = null;


          // When the controller loads, check for a case id in the url params, if it's
          // there then call the case lookup with that case number
          ctrl.$onInit = function() {
            console.log('case list ', ctrl.caseList)
            if ($stateParams.caseId) {
              console.log('stateParams ', $stateParams)
              ctrl.caseId = $stateParams.caseId
              ctrl.caseLookup(ctrl.caseId)
            } 
          }


          // lookup case by caseId. CaseId can come from either url params, or from the user typing
          // it in the search box located in this view.
          ctrl.caseLookup = function(searchId) {
            // caseList comes loaded from the route resolve, as a firebaseArray of all cases
            ctrl.caseRecord =  ctrl.caseList.find(function(elm) {
              return elm.caseId === searchId
            })

                if (ctrl.caseRecord) {
                  ctrl.isCaseIdValid = true;
                } else {
                    ctrl.isCaseIdValid = false;
                }
            
            $state.go('caseMain.caseXV', {caseId: searchId})
          }

           // save edits to case info
          ctrl.saveChanges = function() {
              // convert date objects to strings for JSON format in database
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
                //TODO: show a confirmation message to the user
                console.log('changes saved successfully for ', ref.key)
                $mdToast.show(
                    $mdToast.simple()
                      .textContent('Changes Saved')
                      .position('bottom right')
                      .hideDelay(3000)
                )
              })
              .catch(function(err) {
                console.log('error saving changes ', err)
              })
          }

          // cancel edits restore original data
          ctrl.cancelChanges = function() {
            let caseKey = ctrl.caseRecord.$id;
            caseService.LoadAllCases()
            .$loaded().then(function(data) {
              ctrl.caseList = data;
              ctrl.caseRecord = ctrl.caseList.$getRecord(caseIndex);
            }, function(err) {
              console.log('error retrieving data ', err)
            })
            
            ctrl.isActiveEdit = !ctrl.isActiveEdit;

          }
          
          
    }


}
