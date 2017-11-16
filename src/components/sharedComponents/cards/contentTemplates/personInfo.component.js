module.exports = function(app) {
  app.component('rtPersonInfo', {
    template: require('./personInfo.template.html'),
    controller: [ PersonInfoController],
    controllerAs: 'vm',
    bindings: {
                  person: '<',
                  mode: '<',
                  onSaveClick: '&',
      }
    
  })

    function PersonInfoController() {
        const vm = this;
        vm.saved = true;
        
    
        vm.update = () => {
          vm.saved = false;
        }

        vm.handleSaveClick = $event => {
          vm.onSaveClick({data: vm.person});
          vm.saved = true;
        }
      
    }
  
}
