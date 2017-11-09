
module.exports = function(app) {
  app.component('cards', {
    template: require('./cards.template.html'),
    controller: [ '$stateParams',
                  CardsController
    ],
    controllerAs: 'vm',
    bindings: {
                'case': '<',
                'onEditClick': '&',
                'onSaveClick': '&',
                'onCancelClick': '&',
                'onCaseSelected': '&'
    }
  })

  function CardsController($stateParams) {
    const vm = this;

    vm.$onInit = function() {
      if ($stateParams.recordId) {
        vm.onCaseSelected({id: $stateParams.recordId})
      }
    }
    vm.toggleCard = function($event) {
      let element = angular.element($event.target);
      let text = $event.target.innerHTML;
      if (element.hasClass('card-title')) {
        if (text.indexOf('Client') > -1) vm.editClient = !vm.editClient;
        else if (text.indexOf('Borrower') > -1) vm.editBorrower = !vm.editBorrower;
        else if (text.indexOf('Loan') > -1) vm.editLoan = !vm.editLoan;
        else if (text.indexOf('Property') > -1) vm.editProperty = !vm.editProperty;
      }
    }

    vm.onEditClick = function() {
    }
  
  }

}