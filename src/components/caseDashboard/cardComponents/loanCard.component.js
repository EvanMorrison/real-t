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
                'onSaveClick' : '&',
                'toggleCard' : '&'
    }
  })

  function LoanCardController() {
    const vm = this;
    vm.isActiveEdit = false;
    vm.saved = true;
    
      vm.handleEditClick = $event => {
        vm.isActiveEdit = !vm.isActiveEdit;
        vm.onEditClick();
      }

      vm.update = () => {
        vm.saved = false;
      }

      vm.handleSaveClick = $event => {
        vm.onSaveClick({data: vm.loan, category: vm.category});
        vm.saved = true;
        vm.handleEditClick();
        vm.toggleCard({$event: $event, category: vm.category});
      }  
   
       
  }

}