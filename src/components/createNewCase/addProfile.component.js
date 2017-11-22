module.exports = function(app) {
  
  app.component('rtAddProfile', {
    template: require('./addProfile.template.html'),
    controller: [ 
                    'caseService',
                    AddProfileController
    ],
    controllerAs: 'vm',
    bindings: { 
                'profiles': '<',
                'props': '<',
                'sectionLabel': '<',
                'statesList': '<',
                'saveProfileToCase': '&',
    }
  })

  function AddProfileController(caseService) {
    const vm = this;
    vm.mode = 'view';
    vm.states = caseService.states;
    vm.isUnsaved = false;
    
    vm.$onInit = () => {
      vm.actions = { clearSearch: false, save: false }
      vm.baseProfile = vm.props.apiPath === 'people' ? {type: 'organization'} : {};
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

    vm.saveClick = () => {
      vm.actions = Object.assign({}, vm.actions, {save: true})
    }

    vm.handleSaveToCase = (data) => {
      
      // console.log('temporarily returning from save early');
      // return;
      vm.saveProfileToCase({data: data, path: vm.props.apiPath, section: vm.sectionLabel})
      .then(result => {
        vm.mode = 'view';
        vm.actions = Object.assign({}, vm.actions, {save: false}, {clearSearch: true});
        vm.profileToAdd = Object.assign({}, vm.baseProfile);
      })
      .catch(err => console.log('error saving profile to case ', err));
    }
    
    

  }


}