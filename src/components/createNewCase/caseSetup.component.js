module.exports = function(app) {
  app.component('rtNewCaseSetup', {
    template: require('./caseSetup.tabs.template.html'),
    controller: [ 
      '$timeout',
      'caseService',
      CaseSetupController 
    ],
    controllerAs: 'vm',
    bindings: {
                'sections': '<',
                'props': '<',
                'caseRecord': '<',
                'statesList': '<',
                'onCreateNewCase': '&',
                'onSaveProfileToCase': '&'
                
    }
  })

  function CaseSetupController($timeout, caseService) {
    const vm = this;
    vm.$onInit = () => {
      vm.viewTitle = 'Create A New Case';
    }

    vm.$onChanges = changes => {
      if (changes.caseRecord && changes.caseRecord.currentValue) {
        vm.caseRecord = JSON.parse(JSON.stringify(changes.caseRecord.currentValue));
      }
    }

    vm.createNewCase = () => {
      vm.onCreateNewCase()
   }

   vm.saveProfileToCase = (data, path, section) => {
     return vm.onSaveProfileToCase({data: data, path: path, section: section})
     .then(result => console.log('result ', result))
   }

  }
}