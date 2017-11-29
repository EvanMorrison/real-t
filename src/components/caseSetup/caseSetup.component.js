module.exports = function(app) {
  app.component('rtCaseSetup', {
    template: require('./caseSetup.tabs.template.html'),
    controller: [ 
      '$state',
      'caseService',
      CaseSetupController 
    ],
    controllerAs: 'vm',
    bindings: {
                'sections': '<',
                'props': '<',
                'caseRecord': '<',
                'onCreateNewCase': '&',
                'onLookupCaseByCaseNum': '&',
                'onSaveProfileAndUpdateCase': '&',
                'onRemoveProfileFromCase': '&',
    }
  })

  function CaseSetupController($state, caseService) {
    const vm = this;
    vm.$onInit = () => {
      vm.viewTitle = 'Lookup An Existing Case Or Create A New One';
    }

    vm.$onChanges = changes => {
      if (changes.caseRecord && changes.caseRecord.currentValue) {
        vm.caseRecord = JSON.parse(JSON.stringify(changes.caseRecord.currentValue));
        // console.log('case loaded ', vm.caseRecord);
        vm.caseLoaded = true;
        $state.go('caseSetup',({caseNum: vm.caseRecord.caseNum}))
      } else { 
        $state.go('caseSetupStart');
        vm.caseLoaded = false;
      }
    }

  vm.createNewCase = () => {
      vm.onCreateNewCase()
  }

  vm.lookupCaseByCaseNum = () => {
     vm.onLookupCaseByCaseNum({caseNum: vm.caseRecord.caseNum});
  }

  vm.saveProfileAndUpdateCase = (profile, path, section) => {
    return vm.onSaveProfileAndUpdateCase({profile, path, section})
    .then(result => result)
    .catch(err => err);
  }

   vm.removeProfileFromCase = (profile, section) => {
     vm.onRemoveProfileFromCase({ profile, section });
   }
  }
}