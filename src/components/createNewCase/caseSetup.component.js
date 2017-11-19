
module.exports = function(app) {
  app
  .component('caseSetup', {
    template: require('./caseSetup.template.html'),
    controller: [ 
                  '$state',
                  '$timeout',
                  'caseService',
                  NewCaseController
                ],
    controllerAs: 'vm',
    bindings: {
    }
  });

  function NewCaseController($state, $timeout, caseService) { 
    const vm = this;
    vm.viewTitle = 'Create A New Case'
    $timeout(function() {window.scrollTo(0,65);},750)
    
    vm.$onInit = () => { // set up props object for add-profile subcomponents
      vm.sections = ['lender', 'borrower', 'property', 'documents', 'loan', 'lenderAtty', 'borrowerAtty','otherParties'];
      let lender = { title: 'Lender', 
                     apiPath: 'people', 
                     acKeys: ['name']};
      let borrower = Object.assign({},lender,{title: 'Borrower'});
      let lenderAtty = Object.assign({},lender,{title: 'Lender Attorney'}, {acFilter: 'attorney'});
      let borrowerAtty = Object.assign({},lenderAtty,{title: 'Borrower Attorney'});
      let otherParties = Object.assign({},lender,{title: 'Other Parties'});
      let property = { title: 'Property', apiPath: 'properties', acKeys: ['county','taxParcelId']};
      let documents = { title: 'Trust Deed', apiPath: 'documents', acKeys: ['county','entryNo']};
      let loan = { title: 'Loan', apiPath: 'cases'};
      vm.props = { lender, borrower, lenderAtty, borrowerAtty, otherParties, property, documents, loan};
    }
    
    vm.$onChanges = () => {
    }
    
    vm.createNewCase = () => {
       caseService.createNewCase()
      .then(result => {
        vm.caseRecord = result;
        vm.caseSections = Object.keys(vm.caseRecord);
      })
      .catch(err => console.log('error in createNewCase ', err))
    }


    vm.saveProfileToCase = (data, path, section) => {
      if (!vm.caseRecord || !vm.caseRecord._id) return Promise.reject(data);
      return caseService.saveProfileToCase(data, path, section)
      .then(result => {
          return result;
      })
      .catch(err => console.log('error in saveProfileToCase ', err))
    }

    vm.getProfile = (profile, path) => {
      return caseService.getProfile(profile._id, path)
      .then(result => result)
      .catch(err => console.log('error in getProfile: ', err))
    }

    vm.clearProfile = () => {
      vm.profile = null;
    }

    vm.expandBox = (expand, $event) => { // set cursor in autocomplete input box when expanding its container
      if (expand) {
        let target = angular.element($event.target);
        let count = 0;
        while (target.prop('tagName').toLowerCase() !== 'md-card' && count < 5 ) {
          target = target.parent();
          count++; // to ensure no infinite loops
        }
        target = target.find('md-autocomplete').find('input');
        target.focus();
      }
    }

    vm.saveChanges = function(data, category) {
      caseService.updateRecord(data, category)
        .then(result => {
            console.log('result ', result);
        })
        .catch(err => {
          console.log('controller error with updating record ', err)
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


    vm.cancelWithoutSaving = () => {
      caseService.deleteCase(vm.caseRecord)
      .then(result => {
        console.log('the new case has been discarded without saving ', result);
        vm.caseRecord = {};
        vm.isCreating = false;
      })
      .catch(err => {
        console.log('error in new case controller, discarding case. ', err)
      })
    }

    

  }

}