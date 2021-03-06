import template from './addPeople.template.html';

export default function(app) {
  
  app.component('rtAddPeople', {
    template,
    controller: [ 
      'caseService',
      AddPeopleController
    ],
    controllerAs: 'vm',
    bindings: { 
      'profiles': '<',
      'props': '<',
      'section': '<',
      'caseLoaded' : '<',
      'onSaveProfileAndUpdateCase': '&',
      'onRemoveProfileFromCase': '&',
    }
  })

  function AddPeopleController(caseService) {
    const vm = this;
    vm.mode = 'view';
    vm.states = caseService.states;
    vm.isUnsaved = false;
    
    vm.$onInit = () => {
      vm.actions = { clearSearch: false, save: false }
      vm.baseProfile = /Attorney/.test(vm.section) ? { type: 'attorney'} : { type: 'organization'};
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

      vm.profileToAdd = Object.assign({},vm.baseProfile, {_id: 'new'});
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
      vm.onSaveProfileAndUpdateCase({profile, path: vm.props.apiPath, section: vm.section})
      .then(result => {
        if (result) { // expect result to be 'true' for success or 'false' for failure
          vm.profileToAdd = Object.assign({}, vm.baseProfile);
          vm.mode = 'view';
          vm.actions = Object.assign({}, vm.actions, {save: false});
        }
        else vm.actions = Object.assign({}, vm.actions, {save: false})
      })
      .catch(err => err);
    }

    vm.removeProfileFromCase = (index) => {
      if (vm.profileToAdd._id === vm.profiles[index]._id) vm.profileToAdd = Object.assign({}, vm.baseProfile)
      vm.onRemoveProfileFromCase({ profile: vm.profiles[index], section: vm.section });
    }
    
    vm.loadProfileToEdit = (index) => {
      vm.mode = 'edit';
      vm.profileToAdd = Object.assign({}, vm.profiles[index]);
    }

  }


}
