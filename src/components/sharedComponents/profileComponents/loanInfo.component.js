import template from './loanInfo.template.html';

export default function(app) {
  app.component('rtLoanInfo', {
    template,
    controller: [ LoanInfoController ],
    controllerAs: 'vm',
    bindings: {
                profile: '<',
                mode: '<',
                section: '<',
                loanData: '<',
                actions: '<',
                onSaveClick: '&'
    }
  })

  function LoanInfoController() {
    const vm = this;
    
    vm.$onChanges = (changes) => {
      if (changes.profile) {
        let profile = changes.profile; // SimpleChanges class object
        if (profile.currentValue) {
          vm.loan = JSON.parse(JSON.stringify(profile.currentValue));
          vm.loan.payoff = vm.loan.payoff || {}
          vm.loan.payoff.other = vm.initializeOtherCostList();
          vm.updatePayoff(); 
        }
      }
      if (changes.actions) {
        let actions = changes.actions;
        if (actions.currentValue && actions.currentValue.save === true && actions.previousValue.save === false) {
          vm.removeBlankCostEntry();
          vm.onSaveClick({profile: vm.loan});
        }
      } 

    }


  // provide a default for ng-repeat when there are not yet any phones
  vm.initializeOtherCostList = () => {
    if (!vm.loan.payoff.other || vm.loan.payoff.other.length === 0) return [{ amount: null, description: null}];
    else return vm.loan.payoff.other;
  }
  
  vm.removeBlankCostEntry = () => {
    let last = vm.loan.payoff.other.length - 1;
    if (vm.loan.payoff.other[last].amount == null) vm.loan.payoff.other.pop();
  }

  vm.addCostEntry = () => {
    vm.loan.payoff.other.push({ amount: null, description: null})
  }

  vm.deleteCostEntry = ($index) => {
    if ($index === 0 && vm.loan.payoff.other[0].amount == null && vm.loan.payoff.other.length === 1) return;
    else vm.loan.payoff.other.splice($index, 1);
  }

  vm.updatePayoff = () => {
    let payoff = vm.loan.payoff;
    let total = payoff.pAndI + payoff.lateFees + payoff.costs;
    for (let i = 0; i < payoff.other.length; i++) {
      total += payoff.other[i].amount;
    }
    vm.payoffTotal = total;
  }
  }
}
