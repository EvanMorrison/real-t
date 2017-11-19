module.exports = function(app) {
  
  app.component('rtAddProfile', {
    template: require('./addProfile.template.html'),
    require: {
      newCaseCtrl: '^caseSetup'
    },
    controller: [ 
                    'caseService',
                    AddProfileController
    ],
    controllerAs: 'vm',
    bindings: { 
                'props': '<',
                'section': '<',
                'expand': '<',
                'saveProfileToCase': '&'
    }
  })

  function AddProfileController(caseService) {
    const vm = this;
    vm.mode = 'view';
    

    vm.getProfile = (item, path) => {
      if (!item || !item._id) vm.profile = { type: 'organization'};
      else {
        caseService.getProfile(item._id, path)
        .then(result => vm.profile = result, vm.mode = 'edit')
        .catch(err => err);
      }
    }

    vm.clickCreateNew = ($event) => {
      vm.mode = 'edit';
      vm.profile = {type: 'organization'};
    }

    vm.handleSaveToCase = ($event) => {
      vm.saveProfileToCase({data: vm.profile, path: vm.props.apiPath, section: vm.section})
      .then(result => {
        vm.mode = 'view';
        vm.profile = result
      })
      .catch(err => err);
    }


  }


}