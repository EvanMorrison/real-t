  


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

          
          
          // default value sets fields to read-only
          vm.isActiveEdit = false
          vm.isNewCase = false;
          vm.isLockedOpen = "$mdMedia('min-width:500px')";
          //title for toolbar
          vm.viewTitle = 'View, Edit & Create Cases'
            // vm.viewTitle = 'Create New Case'

          // property to user for sorting cases in sidenav
          vm.orderProp = 'caseNum';

          vm.toggleSidenav = function($event) {
            $event.preventDefault();
            $mdSidenav('sideMenu').toggle();
          }

          vm.closeSidenav = function() {
            $mdSidenav('sideMenu').close();
          }
          
          // lookup case by its firebase $id. when selected from the sidenav list
          vm.caseLookup = function(caseNum) {
            vm.waiting = true;
            // vm.caseList is loaded from the resolve for this state/route
            
            vm.caseRecord = vm.caseList.filter(a => a.caseNum === caseNum )[0];
            console.log('case record ', vm.caseRecord);
            // }, function(err) {
            //     vm.waiting = false;
            //     $mdDialog.show(
            //       $mdDialog.alert()
            //         .title('Error')
            //         .textContent(`There was a problem retrieving case data. ${err}`)
            //         .ok('Ok')
            //     )
            // })
          }

        //////////////////////////////////////
        //    EDIT EXISTING CASES        ////
        ////////////////////////////////////


          

           // save edits to case info
          vm.saveChanges = function(data, category) {
            let lender = vm.caseRecord.lender[0];
            if (data === lender) console.log('same pointer ')
            else console.log('not the same');
            caseService.updateRecord(data, category)
              .then(result => {
                Object.assign(data, result);
                console.log('case record ', vm.caseRecord);
                return result;

              })
              .catch(err => {
                vm.waiting = false;
                console.log('controller error saving changes ', err)
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
          $state.go('newCase');
        }

        // vm.createNewCase = function() {

            // function generateCaseId(yr) {
                
            //       let newNum = Math.random().toString().slice(2,7);
            //       newNum = yr + '-' + newNum;
            //       return newNum
            // }
            // // create the object structure for the case
            // vm.caseRecord = {};
            // // generates a semi random case number
            // vm.caseRecord.casenum = generateCaseId('17');
            // vm.caseRecord.client = {name: ''};
            // vm.caseRecord.borrower = {name: ''};
            // vm.caseRecord.property = {taxId: ''};
            // vm.caseRecord.loan = { amount: ''};
            // vm.caseRecord.loan.DOT = {entry: ''};
            // vm.caseRecord.loan.DOT.assignments = {1: {entry: ''}}
            // // save the new empty case to firebase
        //         $state.go('newCase')
    

              
        // }

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
