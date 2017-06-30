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
      ctrl.isCaseIdValid = false;
    }

    ctrl.createNewCase =function(newCaseId) {
        console.log('running create new case ')
        newCaseId = newCaseId || ctrl.generateCaseId('17');
        
        $firebaseObject($firebaseRef.cases.child(newCaseId)).$loaded(function(fbObj) {
          // check if caseId is unique, if not increment by 1
          if (fbObj.caseId) {
            newCaseId = '17-' + (parseInt(newCaseId.slice(3)) + 1).toString()
            ctrl.createNewCase(newCaseId)
          } else {
            // the new case number is unique
            // create the object structure for the case
            ctrl.newCase = fbObj;
            ctrl.newCase.caseId = fbObj.$id;
            ctrl.newCase.lender = {name: ''};
            ctrl.newCase.borrower = {name: ''};
            ctrl.newCase.property = {taxId: ''};
            ctrl.newCase.loan = { amount: ''};
            ctrl.newCase.loan.DOT = {entry: ''};
            ctrl.newCase.loan.DOT.assignments = {1: {entry: ''}}

            ctrl.isCaseIdValid = true;
            ctrl.newCase.$save();
          }
        }, function(err){
            console.log('error creating new case ', err);
        })
    }

    ctrl.generateCaseId = function(yr) {
        let newNum = Math.floor(Math.random() * 100000).toString();
        newNum = yr + '-' + newNum;
        console.log('newNum', newNum)
        return newNum
    }

   
    
       // save edits to database
          ctrl.saveChanges = function() {
              // convert dates to strings for JSON format in database
              if (ctrl.newCase.loan.DOT.recorded ) {
                ctrl.newCase.loan.DOT.recorded = ctrl.caseRecord.loan.DOT.recorded.toString()
              }
              angular.forEach(ctrl.newCase.loan.assignments, function(val, key) {
                if (val['recorded']) { 
                  val['recorded'] = val['recorded'].toString()
                }
              })
              ctrl.newCase.$save().then(function(ref){
                console.log('saved case ', ref.key)
              })
          }

          // cancel edits restore original data
          ctrl.cancelNewCase = function() {
              if (window.confirm('Click OK to cancel without saving')) {
                  ctrl.isCaseIdValid = false;
                  ctrl.newCase.$remove().then(function(ref) {
                  console.log('deleted record ', ref.key)
                  }, function(err) {
                    console.log('error ', error);
                  })
              }
          }
          


  }

}());