import template from './addDocuments.template.html';

export default function(app) {
  
  app.component('rtAddDocuments', {
    template,
    controller: [ 
      'caseService',
      AddDocumentsController
    ],
    controllerAs: 'vm',
    bindings: { 
      profile: '<',
      props: '<',
      section: '<',
      loanData: '<',
      caseLoaded : '<',
      onSaveProfileAndUpdateCase: '&',
      onRemoveProfileFromCase: '&',     
    }
  })

  function AddDocumentsController(caseService) {
    const vm = this;
    vm.mode = 'view';
    
    vm.$onInit = () => {
      vm.actions = { save: false }
    }

    vm.$onChanges = (changes) => {
      if (changes.profile) vm.profileToAdd = vm.baseProfile = vm.profile;
    }


    vm.editCurrentProfile = () => { // edit an existing profile before adding it to the case
      vm.mode = 'edit';
      // provide defaults based on data entered in other case sections
      vm.profileToAdd.trustDeed.amount = vm.profile.trustDeed.amount || vm.loanData.amount;
      vm.profileToAdd.trustDeed.ob = vm.profile.trustDeed.ob || vm.loanData.lender;
      vm.profileToAdd.trustDeed.cb = vm.profile.trustDeed.cb || vm.loanData.lender;
      vm.profileToAdd.trustDeed.trustor = vm.profile.trustDeed.trustor || vm.loanData.borrower;
      vm.profileToAdd.trustDeed.date = vm.profile.trustDeed.date || vm.loanData.date;
      vm.profileToAdd.trustDeed.recDate = vm.profile.trustDeed.recDate || vm.loanData.date;
      vm.profileToAdd = Object.assign({}, vm.profileToAdd);
    }

    vm.saveClick = () => { // user clicks save/add profile to case
      // the save action triggers the profile component to call handleSaveToCase and
      // send the current profile data
      vm.actions = Object.assign({}, vm.actions, {save: true}) 
    }

    vm.cancelChangesToProfile = () => {
      vm.mode = 'view';
      vm.profileToAdd = Object.assign({},vm.baseProfile);
    }

    vm.handleSaveToCase = (profile) => {
      vm.onSaveProfileAndUpdateCase({profile, path: vm.props.apiPath, section: vm.section})
      .then(result => {
        console.log('result ', result);
        if (result) {
          vm.profileToAdd = Object.assign({}, vm.baseProfile);
          vm.mode = 'view';
          vm.actions = Object.assign({}, vm.actions, {save: false});
        }
        else vm.actions = Object.assign({}, vm.actions, {save: false})
      })
      .catch(err => err);
    }


  }


}
