module.exports = function(app) {
  app.component('rtLoanInfo', {
    template: require('./loanInfo.template.html'),
    controller: [ LoanInfoController ],
    controllerAs: 'vm',
    transclude: true,
    bindings: {
                profile: '<',
                mode: '<',
                section: '<',
                statesList: '<',
                'actions': '<',
                onSaveClick: '&'
    }
  })

  function LoanInfoController() {
    const vm = this;
    
    vm.$onInit = () => {
      console.log('loan profile ', vm.profile)
      vm.profileToAdd = vm.profile;
    }

    vm.$onChanges = (changes) => {
      if (changes.profile) {
        let profile = changes.profile; // SimpleChanges class object
        if (profile.currentValue) {
          vm.loan = JSON.parse(JSON.stringify(profile.currentValue));
          vm.profileToAdd = vm.loan;
        }
      }
      if (changes.actions) {
        let actions = changes.actions;
        if (actions.currentValue && actions.currentValue.save === true && actions.previousValue.save === false) {
          vm.onSaveClick({profile: vm.loan});
        }
      } 

    }

    vm.update = () => {
    }

   
  }
}