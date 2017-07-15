module.exports = function(app) {
  app
  .component('newCase', {
    template: require('./newCase.template.html'),
    controller: [ '$firebaseArray',
                  '$firebaseObject',
                  '$firebaseRef', 
                  NewCaseController
                ],
    controllerAs: 'vm',
    bindings: {
                'caseList': '<'
    }
  });

  function NewCaseController($firebaseArray, $firebaseObject, $firebaseRef) { 
    const vm = this;
    vm.isCaseIdValid = true;

    vm.$onInit = function() {
      vm.isCaseIdValid = false;
    }

    vm.createNewCase =function(newCaseId) {
        console.log('running create new case ')
        vm.isCreating = true;
        newCaseId = newCaseId || vm.generateCaseId('17');
        
        $firebaseObject($firebaseRef.cases.child(newCaseId)).$loaded(function(fbObj) {
          // check if caseId is unique, if not increment by 1
          if (fbObj.caseId) {
            newCaseId = '17-' + (parseInt(newCaseId.slice(3)) + 1).toString()
            vm.createNewCase(newCaseId)
          } else {
            // the new case number is unique
            // create the object structure for the case
            vm.newCase = fbObj;
            vm.newCase.caseId = fbObj.$id;
            vm.newCase.lender = {name: ''};
            vm.newCase.borrower = {name: ''};
            vm.newCase.property = {taxId: ''};
            vm.newCase.loan = { amount: ''};
            vm.newCase.loan.DOT = {entry: ''};
            vm.newCase.loan.DOT.assignments = {1: {entry: ''}}

            vm.isCaseIdValid = true;
            vm.newCase.$save();
          }
        }, function(err){
            console.log('error creating new case ', err);
        })
    }

    vm.generateCaseId = function(yr) {
        let newNum = Math.random().toString().slice(2,7);
        console.log('newNum ', newNum);
        newNum = yr + '-' + newNum;
        console.log('newNum', newNum)
        return newNum
    }

   
    
       // save edits to database
          vm.saveChanges = function() {
              // convert dates to strings for JSON format in database
              if (vm.newCase.loan.DOT.recorded ) {
                vm.newCase.loan.DOT.recorded = vm.caseRecord.loan.DOT.recorded.toString()
              }
              angular.forEach(vm.newCase.loan.assignments, function(val, key) {
                if (val['recorded']) { 
                  val['recorded'] = val['recorded'].toString()
                }
              })
              vm.newCase.$save().then(function(ref){
                console.log('saved case ', ref.key)
              })
          }

          vm.finalize = function() {
            vm.isCreating = false;
          }
          // cancel edits restore original data
          vm.cancelNewCase = function() {
            vm.isCreating = false;
              if (window.confirm('Click OK to cancel without saving')) {
                  vm.isCaseIdValid = false;
                  vm.newCase.$remove().then(function(ref) {
                  console.log('deleted record ', ref.key)
                  }, function(err) {
                    console.log('error ', error);
                  })
              }
          }
          


  }

}