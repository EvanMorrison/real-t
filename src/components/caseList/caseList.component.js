

module.exports = function(ngModule) {
  ngModule
    .component('caseList', {
      template: require('./caseList.template.html'),
      controller: [ '$mdDialog',
                    '$state', 
                    CasesController
                  ],
      controllerAs: 'vm',
      bindings: { caseList : '<'},
    });

    function CasesController($mdDialog, $state) {
      const vm = this;

      vm.orderProp = 'caseId';


      // toggle parent or child state depending on what is currently showing
      vm.toggleSelected = function(index) {
          
          if (vm.selectedCase === index) {
            vm.selectedCase = null;
            } else {
              vm.selectedCase = index;
            }
      }

      // delete a case from the database and the local firebaseArray    
      vm.deleteCase = function(ev, caseObj) {
        const confirm = $mdDialog.prompt()
          .title('Delete Case')
          .textContent(`To delete case ${caseObj.caseId}, enter the case number below.\nThis cannot be undone.`)
          .placeholder(caseObj.caseId)
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel')

        $mdDialog.show(confirm)
          .then(function(result) {
              vm.waiting = true;
              if (result == caseObj.caseId) {
                vm.caseList.$remove(caseObj)
                  .then(function(ref){
                    vm.waiting = false;
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent(`Case ${caseObj.caseId} has been permanently deleted.`)
                        .ok('Ok')
                    )
                  }, function(err) {
                    vm.waiting = false;
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(`Case ${caseObj.caseId} has been permanently deleted.`)
                        .ok('Ok')
                    )
                  })
              } else {
                  vm.waiting = false;
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Not Deleted')
                      .textContent('The case numbers did not match, the case was not deleted.')
                      .ok('Ok')
                  )
              }
          }, function() {
                vm.waiting = false;
                console.log('delete canceled by user')
          })
        
      }
      // end deleteCase

      // goto to fullDetail view for a selected case
      vm.gotoCase = function (caseObj) {
          $state.go('fullDetail', {recordId: caseObj.$id })
      }


    }

}