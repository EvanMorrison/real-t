(function() {

  angular.module('CaseMain')
  .component('newCase', {
    templateUrl: 'components/newCase/newCase.template.html',
    controller: ['$firebaseArray', '$firebaseObject', '$firebaseRef', NewCaseController],
    controllerAs: 'ctrl'
  });

  function NewCaseController($firebaseArray, $firebaseObject, $firebaseRef) { 
    const ctrl = this;
    ctrl.isCaseIdValid = true;

    ctrl.$onInit = function() {
    }

    ctrl.createNewCase =function() {
        console.log('running create new case ')
        ctrl.newCase = $firebaseObject($firebaseRef.cases.push({caseId: ctrl.generateCaseId('17')}));
    }

    ctrl.generateCaseId = function(yr) {
        let newNum = Math.floor(Math.random() * 100000).toString();
        newNum = yr + '-' + newNum;
        console.log('newNum', newNum)
        return newNum
    }

    // load full array of cases to list on screen 
    // ctrl.caseList = $firebaseArray($firebaseRef.cases)

      // delete a case from the database and the local firebaseArray    
      // ctrl.deleteCase = function(index) {
      //   console.log(index)
      //   ctrl.caseList.$remove(index)
      //   .then(function(ref) {
      //     console.log("ref.$id ", ref.key);
      //   })
      // }
    
       // save edits to database
          ctrl.saveChanges = function() {
              // convert dates to strings for JSON format in database
              // if (ctrl.newCase.loan.DOT.recorded ) {
              //   ctrl.newCase.loan.DOT.recorded = ctrl.caseRecord.loan.DOT.recorded.toString()
              // }
              // angular.forEach(ctrl.newCase.loan.assignments, function(val, key) {
              //   if (val['recorded']) { 
              //     val['recorded'] = val['recorded'].toString()
              //   }
              // })
              console.log('saving changes ')
              ctrl.newCase.$save().then(function(ref){
                console.log('saved case ', ref.key)
              })
          }

          // cancel edits restore original data
          ctrl.cancelNewCase = function() {
              if (window.confirm('Click OK to cancel without saving')) {
                  ctrl.newCase.$remove().then(function(ref) {
                  console.log('deleted record ', ref.key)
                  }, function(err) {
                    console.log('error ', error);
                  })
              }
          }
          


  }

}());