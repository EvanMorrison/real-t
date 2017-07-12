
// Container Component for Login-sidebar, user authentication, and all content views
module.exports = function(ngModule) {
  ngModule
      .component('appContainer', {
        template: require('./appContainer.template.html'),
        controller: [ 
                      '$state',
                      '$firebaseAuth',
                       AppContainerController
                    ],
        controllerAs: 'vm'
      });

      function AppContainerController($state, $firebaseAuth) {
              const vm = this;
              
              
              vm.authObj = $firebaseAuth();

             

              // watch for changes in authentication state
                  vm.authObj.$onAuthStateChanged(function(authData){
                    vm.user = authData
                    if (authData) {
                      vm.user.isLoggedIn = true;
                      if (authData.isAnonymous) {
                        vm.user.username = 'anonymous'
                      } else if (authData.displayName) {
                        vm.user.username = authData.displayName
                      } else if (authData.email) {
                        vm.user.username = authData.email
                      } else {
                        vm.user.username = ''
                      }

                    } else {
                      vm.user = { isLoggedIn: false };
                      $state.go('login')
                    }
                  })

            // let the user log out
              vm.logout = function() {
                vm.authObj.$signOut();
                vm.user = { isLoggedIn: false };
                $state.go('login')
              }
      }

}
