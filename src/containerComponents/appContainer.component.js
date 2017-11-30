
// Container Component for Login-sidebar, user authentication, and all content views
module.exports = function(app) {
  app
      .component('appContainer', {
        template: require('./appContainer.template.html'),
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
