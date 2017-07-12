

module.exports = function(ngModule) {
  ngModule
    .component('caseList', {
      template: require('./caseList.template.html'),
      controller: [ '$mdDialog',
                    '$state', 
                    'caseService', 
                    '$firebaseAuth', 
                    CasesController
                  ],
      controllerAs: 'ctrl',
      bindings: { caseList : '<'},
    });

    function CasesController($mdDialog, $state, caseService, $firebaseAuth) {
      const ctrl = this;

      ctrl.orderProp = 'caseId';


      // toggle parent or child state depending on what is currently showing
      ctrl.toggleSelected = function(index) {
          
          if (ctrl.selectedCase === index) {
            ctrl.selectedCase = null;
            } else {
              ctrl.selectedCase = index;
            }
      }

      // delete a case from the database and the local firebaseArray    
      ctrl.deleteCase = function(ev, caseObj) {
        const confirm = $mdDialog.prompt()
          .title('Delete Case')
          .textContent(`To delete case ${caseObj.caseId}, enter the case number below.\nThis cannot be undone.`)
          .placeholder(caseObj.caseId)
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel')

        $mdDialog.show(confirm)
          .then(function(result) {
              if (result == caseObj.caseId) {
                ctrl.caseList.$remove(caseObj)
                  .then(function(ref){
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Success')
                        .textContent(`Case ${caseObj.caseId} has been permanently deleted.`)
                        .ok('Ok')
                    )
                  }, function(err) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(`Case ${caseObj.caseId} has been permanently deleted.`)
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

      ctrl.gotoCase = function (caseObj) {
          $state.go('fullDetail', {recordId: caseObj.$id })
      }

      // handle change in user authentication status
      // ctrl.authObj = $firebaseAuth();

      // ctrl.authObj.$onAuthStateChanged(function(user) {
      //   if (user) {
      //       caseService.LoadAllCases()
      //       .$loaded(function(cases) {
      //         ctrl.caseList = cases
      //       }, function(err) {
      //         console.log('error retrieving cases ', err)
      //       })
      //   } else {
      //       ctrl.caseList.$destroy();
      //   }
      // });

    }

}