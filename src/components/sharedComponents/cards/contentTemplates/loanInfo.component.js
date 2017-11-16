module.exports = function(app) {
  app.component('rtLoanInfo', {
    template: require('./loanInfo.template.html'),
    controller: [ LoanInfoController ],
    controllerAs: 'vm',
    bindings: {
                  loan: '<',
                  mode: '<',
                  onSaveClick: '&',
    }
  })

  function LoanInfoController() {
    const vm = this;
    
    vm.saved = true;
    
    vm.update = () => {
      vm.saved = false;
    }

    vm.handleSaveClick = $event => {
      vm.onSaveClick({data: vm.loan});
      vm.saved = true;
    }  
 
  }
}