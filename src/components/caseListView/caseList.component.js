

module.exports = function (app) {
  app
    .component('caseList', {
      template: require('./caseList.template.html'),
      controller: [ 
                    '$mdDialog',
                    '$state',
                    'caseService',
                    'listViewService',
                    CasesController
                  ],
      controllerAs: 'vm',
      bindings: { caseList : '<'},
    });

    function CasesController($mdDialog, $state, caseService, listViewService) {
      const vm = this;
      
      // display a spinner while waiting to load async api calls
      vm.waiting = listViewService.waiting;

      vm.orderProp = 'caseNum';

      // toggle parent or child state depending on what is currently showing
      vm.toggleSelected = function(index) {
          
          if (vm.selectedCase === index) {
            vm.selectedCase = null;
            } else {
              vm.selectedCase = index;
            }
      }

      // delete a case from the database and the local firebaseArray    
      vm.deleteCase = function($event, caseRecord) {
        const confirm = $mdDialog.prompt()
          .title('Delete Case')
          .textContent(`To delete case ${caseRecord.caseNum}, enter the case number below.\nThis cannot be undone.`)
          .placeholder(caseRecord.caseNum)
          .targetEvent($event)
          .ok('Delete')
          .cancel('Cancel')

        $mdDialog.show(confirm)
          .then(function(result) {
              if (result == caseRecord.caseNum) {
                console.log('trying to delete case ', caseRecord._id)
                caseService.deleteCase(caseRecord)
                  .then(function(result){
                    // this.caseList = result;
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent(`Case ${caseRecord.caseNum} has been permanently deleted.`)
                        .ok('Ok')
                    )
                  }, function(err) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(`Could not delete case ${caseRecord.caseNum}. \n${err.status} ${err.statusText}.`)
                        .ok('Ok')
                    )
                  })
              } else {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .clickOutsideToClose(true)
                      .title('Not Deleted')
                      .textContent('The case numbers did not match, the case was not deleted.')
                      .ok('Ok')
                  )
              }
          }, function() {
                console.log('delete canceled by user')
          })
        
      }
      // end deleteCase

      // goto to caseFocus view for a selected case
      vm.gotoCase = function (caseRecord) {
          $state.go('caseFocus', {caseNum: caseRecord.caseNum, case_id: caseRecord._id })
      }


    }

}