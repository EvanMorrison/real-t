module.exports = function(app) {
  app 
    .component('editToolbar', {
      template: require('./editToolbar.template.html'),
      controller: [ EditToolbarController ],
      controllerAs: 'vm',
      bindings: {
                  'isActiveEdit': '<',
                  'onEdit' : '&',
                  'onSave' : '&',
                  'onCancel': '&'
      }
    });

    function EditToolbarController() {
        const vm = this;
        vm.searchId = '';
        vm.edit = function() {
          vm.onEdit();
        }

        vm.save = function() {
          vm.onSave();
        }

        vm.cancel = function() {
          vm.onCancel();
        }
        
    }
}