

module.exports = function(app) {
  app
  .component('rtCaseDataContainer', {
    template: require('./caseData.template.html'),
    controller: [ 
                  '$mdDialog',
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

  function CaseDataController($mdDialog, $state, $stateParams, caseService) { 
    const vm = this;
    
    
    vm.$onInit = () => { // set up props object that maps to the data structure of a case and properties needed in handling display, search, etc.
      vm.sections = ['lender', 'borrower', 'property', 'documents', 'loan', 'lenderAttorney', 'borrowerAttorney','otherParties'];
      let lender = { title: 'Lender', 
                     apiPath: 'people', 
                     acKeys: ['name']};
      let borrower = Object.assign({},lender,{title: 'Borrower'});
      let lenderAttorney = Object.assign({},lender,{title: 'Lender Attorney'}, {acFilter: 'attorney'}, { client: true });
      let borrowerAttorney = Object.assign({},lenderAttorney,{title: 'Borrower Attorney'});
      let otherParties = Object.assign({},lender,{title: 'Other Parties'}, {role: true}, {getsNotices: true});
      let property = { title: 'Property', apiPath: 'properties', acKeys: ['county','taxId']};
      let documents = { title: 'Trust Deed', apiPath: 'documents', acKeys: ['county', 'date','entryNo']};
      let loan = { title: 'Loan', apiPath: 'cases'};
      vm.props = { lender, borrower, lenderAttorney, borrowerAttorney, otherParties, property, documents, loan};

      if ($stateParams.case_id) {
        vm.getCase($stateParams.case_id);
      }
      else if ($stateParams.caseNum) {
        vm.lookupCaseByCaseNum($stateParams.caseNum)
      }
      
    }
    

    // will return a specific person/property/document profile by _id. Used with autocomplete
    // for quickly adding an existing profile to a new case
    vm.getProfile = (profile, path) => {
      return caseService.getProfile(profile._id, path)
      .then(result => result)
      .catch(err => console.log('error in getProfile: ', err))
    }

    // get a case by its Mongo _id
    vm.getCase = case_id => {
      if (!case_id) return;
      return caseService.getCaseRecord(case_id)
      .then(result => vm.caseRecord = result)
      .catch(err => console.log(err))
    }

    // get a case by its case number
    vm.lookupCaseByCaseNum = caseNum => {
      if (!caseNum) return;
      return caseService.getCaseRecordByCaseNum(caseNum)
      .then(result => {
        vm.caseRecord = result;
        $state.go('caseSetup', {caseNum: result.caseNum})
      })
      .catch(err => vm.errorAlert(`There was a problem looking up case number ${caseNum}. Message: ${err}`))
    }


    // create a new empty case with an assigned case number (caseNum)
    vm.createNewCase = () => {
      // create a new documents object for docs to be associated with the case
      caseService.updatePersonPropertyOrDocuments({_id: 'new', }, 'documents')
      .then(result => {
        let documents = result;
        // create the new case
        caseService.createNewCase({documents: result._id})
        .then(result => {
          result.document = documents;
          vm.caseRecord = result;
          $state.go('caseSetup', {caseNum: vm.caseRecord.caseNum})
        })
      })
      .catch(err => vm.errorAlert(`An error occurred attempting to create a new case. Message: ${err}`))
    }

    vm.errorAlert = (message) => {
      $mdDialog.show(
        $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Error')
        .textContent(message)
        .ariaLabel('error performing action')
        .ok('ok')
      )
      vm.caseRecord = null;
      $state.go('caseSetupStart');
    }


    vm.saveProfileAndUpdateCase = (profile, path, section) => {
      console.log('save profile and update case ', 'profile ', profile, ' path ', path, ' section: ', section);
      // non-array, non-ref, direct case sections - 
      if (path === 'cases') { // profile is directly part of the case object
        return caseService.updateCaseSection(vm.caseRecord._id, profile, section)
        .then(result => {
          vm.caseRecord[section] = result[section];
          vm.caseRecord = JSON.parse(JSON.stringify(vm.caseRecord))
          return true;
        })
        .catch(err => console.log('update case section err ', err));
      } else { // profile is a ref to another collection
        // for attorneys and 'other parties', must target appropriate subproperty
          let subsection = null, profileToUpdate = profile;
          if (section.indexOf('attorney') >= 0) subsection = 'attorney';
          if (section.indexOf('other') >= 0) subsection = 'party';
          if (subsection) profileToUpdate = profile[subsection];
          return caseService.updatePersonPropertyOrDocuments(profileToUpdate, path, section)
          .then(result => { // result is the saved/updated profile
            if (subsection) profile[subsection] = result;
            else profile = result;
            return caseService.updateCaseSection(vm.caseRecord._id, profile, section)
            .then(result => { // result is updated case
              vm.caseRecord[section] = result[section];
              vm.caseRecord = JSON.parse(JSON.stringify(vm.caseRecord));
              return true;
            })
          })
          .catch(err => console.log('err 2 ', err));
      }
    }


    vm.removeProfileFromCase = (profile, section) => {
      if (!vm.caseRecord || !vm.caseRecord._id) return Promise.reject('the case is undefined');
      return caseService.removeProfileFromCase(profile, section)
      .then(result => vm.caseRecord = result)
      .catch(err => vm.errorAlert(err))

    }

    
  }

}