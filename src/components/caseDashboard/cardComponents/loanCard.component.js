module.exports = function(app) {
  app.component('loanCard', {
    template: require('./loanCard.template.html'),
    controller: [
                  LoanCardController
    ],
    controllerAs: 'vm',
    bindings: {
                'loan': '<',
                'category': '@',
                'showEdit': '<',
                'onEditClick' : '&',
    }
  })

  function LoanCardController() {
    const vm = this;
    vm.isActiveEdit = false;
    
      vm.handleEditClick = function($event) {
        vm.isActiveEdit = !vm.isActiveEdit;
        vm.onEditClick();
      }


      vm.saveChanges = function() {
        vm.isActiveEdit = !vm.isActiveEdit;
      }
   
       
  }

}