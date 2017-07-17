  
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
                  '$mdSidenav',
                  '$mdDialog', 
                  CaseDashboardController
                ],
    controllerAs: 'vm',
    bindings: { 'caseList': '<'}
  });

    function CaseDashboardController( caseService, 
                                      $state, 
                                      $stateParams, 
                                      $mdSidenav, 
                                      $mdDialog) {
          const vm = this;

          vm.$onInit = function() {
            if ($stateParams.isNewCase) {
              vm.gotoNewCase();
            }
          }
          
          
          // default value sets fields to read-only
          vm.isActiveEdit = false

          //title for toolbar
          vm.viewTitle = 'View, Edit & Create Cases'
            // vm.viewTitle = 'Create New Case'

          // property to user for sorting cases in sidenav
          vm.orderProp = 'caseId';

          vm.toggleSidenav = function($event) {
            $event.preventDefault();
            $mdSidenav('sideMenu').toggle();
          }

          
          // lookup case by its firebase $id. when selected from the sidenav list
          vm.caseLookup = function(searchId) {
            vm.waiting = true;
            // vm.caseList is loaded from the resolve for this state/route
            vm.caseList.$loaded().then(function(){
                vm.waiting = false;
                vm.caseRecord = vm.caseList.$getRecord(searchId);
            }, function(err) {
                vm.waiting = false;
                $mdDialog.show(
                  $mdDialog.alert()
                    .title('Error')
                    .textContent(`There was a problem retrieving case data. ${err}`)
                    .ok('Ok')
                )
            })
          }

        //////////////////////////////////////
        //    EDIT EXISTING CASES        ////
        ////////////////////////////////////


          // when the user clicks the Edit button
          vm.toggleEdit = function() {
            vm.isActiveEdit = !vm.isActiveEdit;
          }

           // save edits to case info
          vm.saveChanges = function() {
            vm.waiting = true;
            console.log('waiting status ', vm.waiting);
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
                vm.waiting = false;
                console.log('changes saved successfully for ', ref.key)
                $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Saved')
                      .textContent('Changes Saved Successfully')
                      .ok('Ok')
                )
              })
              .catch(function(err) {
                vm.waiting = false;
                console.log('error saving changes ', err)
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Error Saving')
                      .textContent(`There was a problem saving: ${err}`)
                      .ok('Ok')
                )

              })
          }

          // cancel edits restore original data
          vm.cancelChanges = function() {
            vm.waiting = true;
            if (vm.caseRecord) {
            let caseKey = vm.caseRecord.$id;
            caseService.LoadAllCases()
            .then(function(data) {
              vm.waiting = false;
              vm.caseList = data;
              vm.caseRecord = vm.caseList.$getRecord(caseKey);
            }, function(err) {
              vm.waiting = false;
              console.log('error retrieving data ', err)
            })
            }
            vm.isActiveEdit = !vm.isActiveEdit;

          }
          
          // when user returns to parent Dashboard state, without any case selected for view
          vm.clearCaseRecord = function() {
            vm.caseRecord = {};
          }
          
        
        //////////////////////////////////////
        //    CREATING NEW CASES         ////
        ////////////////////////////////////

        vm.gotoNewCase = function() {
          vm.isCreating = true;
          // first exit any other child state
          $state.go('caseDashboard');
          vm.createNewCase();
        }

        vm.createNewCase = function() {

            function generateCaseId(yr) {
                
                  let newNum = Math.random().toString().slice(2,7);
                  newNum = yr + '-' + newNum;
                  return newNum
            }
            // create the object structure for the case
            vm.caseRecord = {};
            // generates a semi random case number
            vm.caseRecord.caseId = generateCaseId('17');
            vm.caseRecord.lender = {name: ''};
            vm.caseRecord.borrower = {name: ''};
            vm.caseRecord.property = {taxId: ''};
            vm.caseRecord.loan = { amount: ''};
            vm.caseRecord.loan.DOT = {entry: ''};
            vm.caseRecord.loan.DOT.assignments = {1: {entry: ''}}
            // save the new empty case to firebase
            vm.caseList.$add(vm.caseRecord)
            .then(function(ref) {
              // set the caseRecord to point at the new firebase record
                vm.caseRecord = vm.caseList.$getRecord(ref.key)
              // go to the view for entering new case data
                $state.go('newCase')
            }, function(err) {
                  console.log('error creating new case ', err);
            })
    

              
        }

        vm.autoSaveChanges = function() {
          // convert dates to strings for JSON format in database
              if (vm.caseRecord.loan.DOT.recorded ) {
                vm.caseRecord.loan.DOT.recorded = vm.caseRecord.loan.DOT.recorded.toString()
              }
              angular.forEach(vm.caseRecord.loan.assignments, function(val, key) {
                if (val['recorded']) { 
                  val['recorded'] = val['recorded'].toString()
                }
              })
              vm.caseList.$save(vm.caseRecord).then(function(ref){
                console.log('saved case ', ref.key)
              })
        }

        
        vm.finalizeNewCase = function() {
            vm.isCreating = false;
            $state.go('caseFocus', {recordId: vm.caseRecord.$id})
          }
        // cancel edits restore original data
        vm.cancelNewCase = function() {
            vm.isCreating = false;
              $mdDialog.show(
                $mdDialog.confirm()
                  .title('Cancel Without Saving')
                  .textContent('Do you want to discard the new case without saving?')
                  .ok('Yes')
                  .cancel('No')
              )
                .then(function(yes) {
                    vm.caseList.$remove(vm.caseRecord)
                    .then(function(ref) {
                      console.log('deleted record ', ref.key)
                      vm.clearCaseRecord();
                      $state.go('caseDashboard');
                    }, function(err) {
                      console.log('error ', err);
                    })
                }, function(no) {

                })

        }
    }

}
