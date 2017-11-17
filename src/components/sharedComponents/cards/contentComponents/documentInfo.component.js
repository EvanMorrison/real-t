module.exports = function(app) {
  app.component('rtDocumentInfo', {
    template: require('./documentInfo.template.html'),
    controller: [ DocumentInfoController ],
    controllerAs: 'vm',
    bindings: {
                  documents: '<',
                  mode: '<',
                  onSaveClick: '&',
    }
  })

  function DocumentInfoController() {
    const vm = this;
    vm.saved = true;
    
    vm.update = () => {
      vm.saved = false;
    }

    vm.handleSaveClick = $event => {
      vm.onSaveClick({data: vm.documents});
      vm.saved = true;
    }  
 
  }
}