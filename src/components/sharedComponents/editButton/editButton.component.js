import './editButton.scss';
import template from './editButton.template.html';

export default function(app) {
  app.component('rtEditButton', {
    template,
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
