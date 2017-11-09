
module.exports = function(AuthApp) {

  AuthApp
    .component('loginComponent', {
      template: require('./login.template.html'),
      controller: [ '$mdDialog',
                    '$state',
                    'localAuthService',
                    LoginController
                  ],
      controllerAs: 'vm',
      bindings: {
                  'user': '<'
      }
    });

    function LoginController($mdDialog, $state, localAuthService) {
      const vm = this;
      vm.waiting = localAuthService.spinner;
      vm.signinError = false;

            vm.showAlert = function(message) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('There was a problem signing in.')
                        .textContent(`${message}`)
                        .ariaLabel('alert dialog')
                        .ok('Ok')
                    )
            }
            
        // user signout
        vm.signout = function($event) {
          $event.preventDefault();
          localAuthService.signout();
        }

        // signup with email and password
        vm.signup = function($event) {
          $event.preventDefault();
          localAuthService.signupWithEmailAndPassword(vm.user)
          .then(function(res) {
            $state.go('home');
          })
          .catch(function(err) {
            vm.signinMsg = err.data.message || `Error ${err.status}: ${err.statusText}`;
            if (err.data.provider !== 'local') vm.signinMsg = `${vm.signinMsg} Try signing in with your ${err.data.provider} account.`
            vm.signinError = true;
          })
        }
    
        // sign in with email and password
        vm.signin = function($event) {
          $event.preventDefault();
          localAuthService.signinWithEmailAndPassword(vm.user)
          .then(function(res) {
            $state.go('home');
          })
          .catch(function(err) {
            vm.signinMsg = err.data.message || `Error ${err.status}: ${err.statusText}`;
            vm.signinError = true;
          })
        }


            // anonymous login
            vm.loginAnonymous = function($event) {
            
            }

          // Google OAuth login
          // vm.loginWithGoogle = function($event) {
          //   $event.preventDefault();
          //   vm.waiting = true;
          //   vm.authObj.$signInWithPopup('google')
          //   .then(function(result) {
          //     $state.go('home');
          //   }, function(err) {
          //     console.log('OAuth sign in failed ', err)
          //       vm.waiting = false;
          //       vm.showAlert(err)
          //   })
          // }


          // // Facebook OAuth login
          // vm.loginWithFacebook = function($event) {
          //   $event.preventDefault();
          //   vm.authObj.$signInWithPopup('facebook')
          //   .then(function(result) {
          //       console.log(result)
          //         vm.user = result.user
          //   }, function(err) {
          //     console.log('OAuth sign in failed ', err)
          //   })
          // }
            

    }

}
