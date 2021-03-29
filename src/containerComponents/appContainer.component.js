// Container Component for Login-sidebar, user authentication, and all content views
import template from './appContainer.template.html';

export default function(app) {
  app
      .component('appContainer', {
        template,
        controller: [ 
                      '$state',
                      'localAuthService',
                       AppContainerController
                    ],
        controllerAs: 'vm',
        bindings: { 'user': '<'}
      });

      function AppContainerController($state, localAuthService) {
              const vm = this;
              

            // let the user log out
              vm.signout = function() {
                vm.user = { SignedIn: false };
                localAuthService.signout();
                $state.go('login')
              }
      }

}
