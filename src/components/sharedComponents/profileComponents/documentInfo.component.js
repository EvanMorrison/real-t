import template from './documentInfo.template.html';

export default function(app) {
  app.component('rtDocumentInfo', {
    template,
    controller: [ DocumentInfoController ],
    controllerAs: 'vm',
    bindings: {
                profile: '<',
                mode: '<',
                section: '<',
                actions: '<',
                loanData: '<',
                onSaveClick: '&'
    }
  })

  function DocumentInfoController() {
    const vm = this;
    
    vm.$onChanges = (changes) => {
      if (changes.profile) {
        let profile = changes.profile; // SimpleChanges class object
        if (profile.currentValue) {
          vm.documents = JSON.parse(JSON.stringify(profile.currentValue));
        }
      }
      if (changes.actions) {
        let actions = changes.actions;
        if (actions.currentValue && actions.currentValue.save === true && actions.previousValue.save === false) {
          vm.onSaveClick({profile: vm.documents});
        }
      } 

    }
    
    vm.addDoc = (docType) => {
      vm.documents[docType].push({})
    }

    vm.deleteDoc = (docType, $index) => {
      vm.documents[docType].splice($index, 1)
    }
    
  }
}
