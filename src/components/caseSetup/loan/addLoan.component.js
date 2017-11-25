module.exports = function(app) {
  
  app.component('rtAddLoan', {
    template: require('./addLoan.template.html'),
    controller: [ 
                    'caseService',
                    AddLoanController
    ],
    controllerAs: 'vm',
    bindings: { 
                'profile': '<',
                'props': '<',
                'sectionLabel': '<',
                'statesList': '<',
                'caseLoaded' : '<',
                'onSaveProfileAndUpdateCase': '&',
                'onRemoveProfileFromCase': '&',
            
    }
  })

  function AddLoanController(caseService) {
    const vm = this;
    vm.mode = 'view';
    vm.states = caseService.states;
    
    vm.$onInit = () => {
      vm.actions = { clearSearch: false, save: false }
      vm.baseProfile = {};
      vm.profileToAdd = Object.assign({}, vm.baseProfile);
    }

    vm.lookupProfile = (item, path) => {
      if (vm.mode === 'view' && !item) vm.profileToAdd = Object.assign({}, vm.baseProfile);
      else if (vm.mode === 'edit' && !item) return;
      else {
        caseService.getProfile(item._id, path)
        .then(result => {
          vm.actions = Object.assign({}, vm.actions, {clearSearch: false})
          vm.profileToAdd = result;
          vm.mode = 'view';
        })
        .catch(err => err);
      }
    }

    vm.clickEnterNewProfile = ($event) => {
      vm.mode = 'edit';
      vm.actions = Object.assign({}, vm.actions, { clearSearch: true});
      vm.profileToAdd = Object.assign({},vm.baseProfile, {_id:'new'});
    }

    vm.editCurrentProfile = () => { // edit an existing profile before adding it to the case
      vm.mode = 'edit';
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
      vm.onSaveProfileAndUpdateCase({profile, path: vm.props.apiPath, section: vm.sectionLabel})
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

    
    vm.loadProfileToEdit = (index) => {
      vm.mode = 'edit';
      vm.profileToAdd = vm.profile;
    }

  }


}