
// Container Component for Login-sidebar, user authentication, and all content views
module.exports = function(app) {
  app
      .component('appContainer', {
        template: require('./appContainer.template.html'),
        controller: [ 
                      '$state',
                      '$firebaseAuth',
                      'localAuthService',
                       AppContainerController
                    ],
        controllerAs: 'vm',
        bindings: { 'user': '<'}
      });

      function AppContainerController($state, $firebaseAuth, localAuthService) {
              const vm = this;
              
              
              vm.authObj = $firebaseAuth();
              

              // watch for changes in authentication state
                  // vm.authObj.$onAuthStateChanged(function(authData){
                  //   vm.user = authData
                  //   if (authData) {
                  //     vm.user.SignedIn = true;
                  //     if (authData.isAnonymous) {
                  //       vm.user.username = 'anonymous'
                  //     } else if (authData.displayName) {
                  //       vm.user.username = authData.displayName
                  //     } else if (authData.email) {
                  //       vm.user.username = authData.email
                  //     } else {
                  //       vm.user.username = ''
                  //     }
                  //   } else {
                  //     vm.user = { SignedIn: false };
                  //     $state.go('login')
                  //   }
                  // })
          
            // let the user log out
              vm.signout = function() {
                // vm.authObj.$signOut();
                vm.user = { SignedIn: false };
                localAuthService.signout();
                $state.go('login')
              }
      }

    

}
