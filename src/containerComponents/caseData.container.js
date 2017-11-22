
module.exports = function(app) {
  app
  .component('rtCaseDataContainer', {
    template: require('./caseData.template.html'),
    controller: [ 
                  '$state',
                  '$stateParams',
                  'caseService',
                  CaseDataController
                ],
    controllerAs: 'vm',
    bindings: {
                'user': '<'
    }
  });

  function CaseDataController($state, $stateParams, caseService) { 
    const vm = this;
    
    
    vm.$onInit = () => { // set up props object that maps to the data structure of a case and properties needed in handling display, search, etc.
      vm.statesList = caseService.statesList;
      vm.sections = ['lender', 'borrower', 'property', 'documents', 'loan', 'lenderAttorney', 'borrowerAttorney','otherParties'];
      let lender = { title: 'Lender', 
                     apiPath: 'people', 
                     acKeys: ['name']};
      let borrower = Object.assign({},lender,{title: 'Borrower'});
      let lenderAttorney = Object.assign({},lender,{title: 'Lender Attorney'}, {acFilter: 'attorney'}, { client: true });
      let borrowerAttorney = Object.assign({},lenderAttorney,{title: 'Borrower Attorney'});
      let otherParties = Object.assign({},lender,{title: 'Other Parties'}, {role: true}, {getsNotices: true});
      let property = { title: 'Property', apiPath: 'properties', acKeys: ['county','taxParcelId']};
      let documents = { title: 'Trust Deed', apiPath: 'documents', acKeys: ['county', 'date','entryNo']};
      let loan = { title: 'Loan', apiPath: 'cases'};
      vm.props = { lender, borrower, lenderAttorney, borrowerAttorney, otherParties, property, documents, loan};

      if ($stateParams.case_id) {
        vm.getCase($stateParams.case_id);
      }
      
    }
    

    vm.getCase = case_id => {
      if (!case_id) return;
      return caseService.getCaseRecord(case_id)
      .then(result => vm.caseRecord = result)
      .catch(err => console.log(err))
    }

    // create a new empty case with an assigned case number (caseNum)
    vm.createNewCase = () => {
      caseService.createNewCase()
      .then(result => {
        vm.caseRecord = result;
        return vm.caseRecord;
      })
    }

    // this will add a person/property/document profile to the current caseRecord
    vm.saveProfileToCase = (data, path, section) => {
      if (!vm.caseRecord || !vm.caseRecord._id) return Promise.reject(data);
      if (data._id === 'new') delete data._id;
      return caseService.saveProfileToCase(data, path, section)
      .then(result => vm.caseRecord = result)
      .catch(err => console.log('error in saveProfileToCase ', err))
    }

    // will return a specific person/property/document profile by _id. Used with autocomplete
    // for quickly adding an existing profile to a new case
    vm.getProfile = (profile, path) => {
      return caseService.getProfile(profile._id, path)
      .then(result => result)
      .catch(err => console.log('error in getProfile: ', err))
    }

    
    // this is not tied in with the current version
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