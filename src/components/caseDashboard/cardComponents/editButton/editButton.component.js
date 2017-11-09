require('./editButton.scss');

module.exports = function(app) {
  app.component('editButton', {
    template: require('./editButton.template.html'),
    controller: [
                  EditButtonController
    ],
    controllerAs: 'vm',
    bindings: {
                'showEdit': '<',
                'isActiveEdit': '<',
                'onEditClick': '&'
    }

  })

  function EditButtonController() {
    const vm = this;
    vm.handleEditClick = function() {
      vm.onEditClick();
    }
  }
}