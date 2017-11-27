module.exports = function(app) {
  
  app.component('rtAddLoan', {
    template: require('./addLoan.template.html'),
    controller: [ 
                    AddLoanController
    ],
    controllerAs: 'vm',
    bindings: { 
                'profile': '<',
                'props': '<',
                'sectionLabel': '<',
                'caseLoaded' : '<',
                'onSaveProfileAndUpdateCase': '&',
                'onRemoveProfileFromCase': '&',
            
    }
  })

  function AddLoanController(caseService) {
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
    }

    vm.saveClick = () => { // user clicks save/add profile to case
      // the save action triggers the profile component to call handleSaveToCase and
      // send the current profile data
      vm.actions = {save: true};
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
    

  }


}