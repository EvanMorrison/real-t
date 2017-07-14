

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
      controllerAs: 'vm',
      bindings: { caseList : '<'},
    });

    function CasesController($mdDialog, $state, caseService, $firebaseAuth) {
<<<<<<< HEAD
      const vm = this;
=======
      const ctrl = this;
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b

      vm.orderProp = 'caseId';


      // toggle parent or child state depending on what is currently showing
<<<<<<< HEAD
      vm.toggleSelected = function(index) {
          
          if (vm.selectedCase === index) {
            vm.selectedCase = null;
=======
      ctrl.toggleSelected = function(index) {
          
          if (ctrl.selectedCase === index) {
            ctrl.selectedCase = null;
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
            } else {
              vm.selectedCase = index;
            }
      }

      // delete a case from the database and the local firebaseArray    
<<<<<<< HEAD
      vm.deleteCase = function(ev, caseObj) {
=======
      ctrl.deleteCase = function(ev, caseObj) {
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
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
<<<<<<< HEAD
                vm.caseList.$remove(caseObj)
=======
                ctrl.caseList.$remove(caseObj)
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
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
      // end deleteCase

<<<<<<< HEAD
      // goto to fullDetail view for a selected case
      vm.gotoCase = function (caseObj) {
=======
      ctrl.gotoCase = function (caseObj) {
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
          $state.go('fullDetail', {recordId: caseObj.$id })
      }

      // handle change in user authentication status
<<<<<<< HEAD
      // vm.authObj = $firebaseAuth();

      // vm.authObj.$onAuthStateChanged(function(user) {
      //   if (user) {
      //       caseService.LoadAllCases()
      //       .$loaded(function(cases) {
      //         vm.caseList = cases
=======
      // ctrl.authObj = $firebaseAuth();

      // ctrl.authObj.$onAuthStateChanged(function(user) {
      //   if (user) {
      //       caseService.LoadAllCases()
      //       .$loaded(function(cases) {
      //         ctrl.caseList = cases
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
      //       }, function(err) {
      //         console.log('error retrieving cases ', err)
      //       })
      //   } else {
<<<<<<< HEAD
      //       vm.caseList.$destroy();
=======
      //       ctrl.caseList.$destroy();
>>>>>>> 87db60d2c760b5719f4c35e4ce7f57ace9221d6b
      //   }
      // });

    }

}