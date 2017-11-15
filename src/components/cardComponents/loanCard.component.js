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
                'showEditBtn': '<',
                'showInputs': '<',
                'onSaveClick' : '&',
                'onEditClick' : '&'
    }
  })

  function LoanCardController() {
    const vm = this;
    vm.saved = true;
    
      vm.handleEditClick = $event => {
          vm.onEditClick({$event: $event, category: vm.category});
      }
      

      vm.update = () => {
        vm.saved = false;
      }

      vm.handleSaveClick = $event => {
        vm.onSaveClick({data: vm.loan, category: vm.category});
        vm.saved = true;
        vm.handleEditClick($event);
      }  
   
       
  }

}