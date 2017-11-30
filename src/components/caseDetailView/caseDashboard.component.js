  


module.exports = function(ngModule) {
  ngModule
  .component('caseDashboard', {
    template: require('./caseDashboard.template.html'),
    controller: [ 'caseService', 
                  '$state', 
                  '$stateParams',
                  '$mdSidenav',
                  '$mdDialog', 
                  CaseDashboardController
                ],
    controllerAs: 'vm',
    bindings: {   
                  $transition$: '<',
                  caseList: '<',
                  caseRecord: '<',
                  props: '<',
                  sections: '<',
                  onLookupCaseByCaseNum: '&',
                  onSaveProfileAndUpdateCase: '&'
                }
  });

    function CaseDashboardController( caseService,
                                      $state, 
                                      $stateParams,
                                      $mdSidenav, 
                                      $mdDialog) {
        const vm = this;

        vm.$onChanges = changes => {
          if (changes.caseRecord) {
            let cr = changes.caseRecord;
            if (cr.currentValue) {
                if ($state.name != 'caseFocus') $state.go('caseFocus', { caseNum: vm.caseRecord.caseNum })
            } else $state.go('caseDashboard')
            }
          
        }

        // start with sidenav open if no case is loaded, otherwise close it
        vm.$onInit = () => {
          if (vm.$transition$.params().caseNum && vm.$transition$.from().name != 'caseFocus') {
            vm.sidenavLocked = false;
            angular.element(document).ready( () => $mdSidenav('sideMenu').close());
            vm.isOpen = false;
          } else {
            vm.sidenavLocked = true;
            angular.element(document).ready( () => $mdSidenav('sideMenu').open());
            vm.isOpen = true;
          }

        }
        
        //title for toolbar
        vm.viewTitle = 'View Case Details'

        // property to user for sorting cases in sidenav
        vm.orderProp = 'caseNum';
        
        vm.toggleSidenav = function($event) {  // menu button in main toolbar toggles sidenav
          vm.sidenavLocked = !vm.sidenavLocked;
          $mdSidenav('sideMenu').toggle();
          vm.isOpen = $mdSidenav('sideMenu').isOpen() ? true : false;
        }

        vm.closeSidenav = function($event) { // close button in sidenav also will close it, on small screens it will close upon selecting a case number from the list
          let target = angular.element($event.target);
          if (target.hasClass('icon-close')) vm.sidenavLocked = false;
          $mdSidenav('sideMenu').close();
          vm.isOpen = false;
        }
        


      vm.gotoNewCase = function() {
        $state.go('caseSetupStart');
      }


      vm.lookupCaseByCaseNum = caseNum => {
        vm.onLookupCaseByCaseNum({caseNum})
      }

      vm.toggleDisplayNames = (profile, path, section) => {
        vm.onSaveProfileAndUpdateCase({profile, path, section})
      }
    
    }

}
