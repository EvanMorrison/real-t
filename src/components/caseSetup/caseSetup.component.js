import template from './caseSetup.tabs.template.html';

export default function(app) {
  app.component('rtCaseSetup', {
    template,
    controller: [ 
      '$state',
      'caseService',
      CaseSetupController 
    ],
    controllerAs: 'vm',
    bindings: {
      'sections': '<',
      'props': '<',
      'caseRecord': '<',
      'onCreateNewCase': '&',
      'onLookupCaseByCaseNum': '&',
      'onSaveProfileAndUpdateCase': '&',
      'onRemoveProfileFromCase': '&',
    }
  })

  function CaseSetupController($state, caseService) {
    const vm = this;
    vm.$onInit = () => {
      vm.viewTitle = 'Lookup An Existing Case Or Create A New One';
    }

    vm.$onChanges = changes => {
      if (changes.caseRecord && changes.caseRecord.currentValue) {
        vm.caseRecord = JSON.parse(JSON.stringify(changes.caseRecord.currentValue));
        let lender = vm.caseRecord.lender.length ? vm.caseRecord.lender[0].fullOrgName || vm.caseRecord.lender[0].fullName : null;
        let borrower = vm.caseRecord.borrower.length ? vm.caseRecord.borrower[0].fullOrgName || vm.caseRecord.borrower[0].fullName : null;
        let TD = vm.caseRecord.documents.trustDeed || {};
        let amount = vm.caseRecord.loan.originalPrincipalAmount || TD.amount;
        let date = vm.caseRecord.loan.loanDate || TD.recDate;
        vm.loanData = { lender, borrower, amount, date };
        // console.log('case loaded ', vm.caseRecord);
        vm.caseLoaded = true;
        $state.go('caseSetup',({caseNum: vm.caseRecord.caseNum}))
      } else { 
        $state.go('caseSetupStart');
        vm.caseLoaded = false;
      }
    }

  vm.createNewCase = () => {
      vm.onCreateNewCase()
  }

  vm.lookupCaseByCaseNum = (item) => {
    if (!item || vm.caseRecord && item.caseNum === vm.caseRecord.caseNum) return;
    vm.onLookupCaseByCaseNum({caseNum: item.caseNum})
  }

  vm.saveProfileAndUpdateCase = (profile, path, section) => {
    return vm.onSaveProfileAndUpdateCase({profile, path, section})
    .then(result => result)
    .catch(err => err);
  }

   vm.removeProfileFromCase = (profile, section) => {
     vm.onRemoveProfileFromCase({ profile, section });
   }
  }
}
