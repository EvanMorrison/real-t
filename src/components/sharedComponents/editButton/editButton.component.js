require('./editButton.scss');

module.exports = function(app) {
  app.component('editButton', {
    template: require('./editButton.template.html'),
    controller: [
                  EditButtonController
    ],
    controllerAs: 'vm',
    bindings: {
                'showEditBtn': '<',
                'showInputForm': '<',
                'onEditBtnClick': '&'
    }

  })

  function EditButtonController() {
    const vm = this;

    vm.handleBtnClick = function($event) {
      vm.onEditBtnClick($event);
    }
  }
}