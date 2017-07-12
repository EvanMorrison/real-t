  
module.exports = function(ngModule) {
  ngModule
    .config(['$compileProvider', function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  }])

  .component('caseDashboard', {
    template: require('./caseDashboard.template.html'),
    controller: [ 'caseService', 
                  
                  '$state', 
                  '$mdSidenav',
                  '$mdToast', 
                  CaseDashboardController
                ],
    controllerAs: 'vm',
    bindings: { 'caseList': '<'}
  });

    function CaseDashboardController(caseService, $state, $mdSidenav, $mdToast) {
          const vm = this;
          vm.isActiveEdit = false
          vm.isCaseIdValid = true;
          const findCaseId = null;


          vm.toggleSidenav = function($event) {
            $event.preventDefault();
            $mdSidenav('sideMenu').toggle();
          }

          
          // lookup case by its firebase $id. when selected from the sidenav list
          vm.caseLookup = function(searchId) {
            // vm.caseList is loaded from the resolve for this state/route
            vm.caseList.$loaded().then(function(){
                vm.caseRecord = vm.caseList.$getRecord(searchId);
            }, function(err) {
                window.alert(`There was a problem retrieving case data: ${err}`)
            })
          }

          // when the user clicks the Edit button
          vm.toggleEdit = function() {
            vm.isActiveEdit = !vm.isActiveEdit;
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
                      .parent(angular.element(document.querySelector('.dashboard-fullDetail-container')))
                      .position('top right')
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
          
          // when user returns to parent Dashboard state, without any case selected for view
          vm.clearCaseRecord = function() {
            vm.caseRecord = {};
          }
          
    }


}
