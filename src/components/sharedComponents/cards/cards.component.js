
module.exports = function(app) {
  app.component('cards', {
    template: require('./cards.template.html'),
    controller: [ '$stateParams',
                  CardsController
    ],
    controllerAs: 'vm',
    bindings: {
                'case': '<',
                'isNewCase': '<',
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
      vm.editLender = vm.editBorrower = vm.editLoan = vm.editProperty = false;
    }


    


    vm.toggleCard = function($event, category) {
      let element = angular.element($event.target);
      let text = category || $event.target.innerHTML;
      if (element.hasClass('card-title') || element.hasClass('save-btn')) {
        if (text.indexOf('Lender') > -1) vm.editLender = !vm.editLender;
        else if (text.indexOf('Borrower') > -1) vm.editBorrower = !vm.editBorrower;
        else if (text.indexOf('Loan') > -1) vm.editLoan = !vm.editLoan;
        else if (text.indexOf('Property') > -1) vm.editProperty = !vm.editProperty;
      }
    }

  
  }

}