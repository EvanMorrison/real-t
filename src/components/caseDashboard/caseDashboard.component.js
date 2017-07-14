  
module.exports = function(ngModule) {
  ngModule
    .config(['$compileProvider', function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  }])

  .component('caseDashboard', {
    template: require('./caseDashboard.template.html'),
    controller: [ 'caseService', 
                  '$state', 
                  '$stateParams', 
                  '$mdToast', 
                  CaseDashboardController
                ],
    controllerAs: 'vm',
    bindings: { 'caseList': '<'}
  });

    function CaseDashboardController(caseService, $state, $stateParams, $mdToast) {
          const vm = this;
          vm.isActiveEdit = false
          vm.isCaseIdValid = true;
          const findCaseId = null;


          // When the controller loads, check for a case id in the url params, if it's
          // there then call the case lookup with that case number
          vm.$onInit = function() {
            console.log('case list ', vm.caseList)
            if ($stateParams.recordId) {
              console.log('stateParams ', $stateParams)
              vm.key = $stateParams.recordId
              vm.caseLookup(vm.key)
            } 
          }


          // lookup case by caseId. CaseId can come from either url params, or from the user typing
          // it in the search box located in this view.
          vm.caseLookup = function(searchId) {
            // caseList comes loaded from the route resolve, as a firebaseArray of all cases
            vm.caseRecord = vm.caseList.$getRecord(searchId);
                console.log('case matched ', vm.caseRecord);
                if (vm.caseRecord) {
                  vm.isCaseIdValid = true;
                  console.log('case is valid')
                } else {
                    vm.isCaseIdValid = false;
                    console.log('case is not valid')
                }
            
            // $state.go('fullDetail', {caseId: searchId})
          }

           // save edits to case info
          vm.saveChanges = function() {
              // convert date objects to strings for JSON format in database
              if (vm.caseRecord.loan && vm.caseRecord.loan.DOT && vm.caseRecord.loan.DOT.recorded) {
                  vm.caseRecord.loan.DOT.recorded = vm.caseRecord.loan.DOT.recorded.toString()
              }
              if (vm.caseRecord.loan && vm.caseRecord.loan.assignments) {
                  angular.forEach(vm.caseRecord.loan.assignments, function(val, key) {
                    if (val['recorded']) { 
                      val['recorded'] = val['recorded'].toString()
                    }
                  })
              }
            
              vm.caseList.$save(vm.caseRecord).then(function(ref) {
                vm.isActiveEdit = !vm.isActiveEdit;
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
          vm.cancelChanges = function() {
            if (vm.caseRecord) {
            let caseKey = vm.caseRecord.$id;
            caseService.LoadAllCases()
            .$loaded().then(function(data) {
              vm.caseList = data;
              vm.caseRecord = vm.caseList.$getRecord(caseKey);
            }, function(err) {
              console.log('error retrieving data ', err)
            })
            }
            vm.isActiveEdit = !vm.isActiveEdit;

          }
          
          
    }


}
