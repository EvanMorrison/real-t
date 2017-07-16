
module.exports = function(AuthApp) {

  AuthApp
    .component('loginComponent', {
      template: require('./login.template.html'),
      controller: [ '$mdDialog',
                    '$state',
                    '$firebaseAuth',
                    LoginController
                  ],
      controllerAs: 'vm',
      bindings: {
                  'user': '<'
      }
    });

    function LoginController($mdDialog, $state, $firebaseAuth) {
      const vm = this;
      vm.waiting = false;
      vm.authObj = $firebaseAuth();

            vm.showAlert = function(err) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('There was a problem signing in.')
                        .textContent(`${err.message}`)
                        .ariaLabel('alert dialog')
                        .ok('Ok')
                    )
            }
       // login with email and password
            vm.login = function($event) {
              $event.preventDefault();
              vm.waiting = true;
              // user login
              vm.authObj.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(res) {
                  vm.user.email = '';
                  vm.user.password = '';
                  $state.go('home');
              }, function(err) {
                    vm.waiting = false;
                    vm.showAlert(err)
                    console.log('error on sign in ', err)
              })  
            }

            // anonymous login
            vm.loginAnonymous = function($event) {
              $event.preventDefault();
                vm.waiting = true;
                vm.authObj.$signInAnonymously()
                .then(function(res){
                  $state.go('home');
                })
                .catch(function(err) {
                  vm.waiting = false;
                  vm.showAlert(err)
                  console.log('error with anonymous sign in ', err)
                })
          }

          // Google OAuth login
          vm.loginWithGoogle = function($event) {
            $event.preventDefault();
            vm.waiting = true;
            vm.authObj.$signInWithPopup('google')
            .then(function(result) {
              $state.go('home');
            }, function(err) {
              console.log('OAuth sign in failed ', err)
                vm.waiting = false;
                vm.showAlert(err)
            })
          }


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

            // user signup with email & password
            vm.signup = function($event) {
              $event.preventDefault();
              vm.waiting = true;
              // sign up
              vm.authObj.$createUserWithEmailAndPassword(vm.user.email, vm.user.password)
              .then(function(user){
                vm.user.email = '';
                vm.user.password = '';
                $state.go('home');
              })
              .catch(function(err) {
                console.log('error ', err)
                vm.waiting = false;
                vm.showAlert(err)
              })
            }

            // user signout
            vm.signOut = function($event) {
              $event.preventDefault();
              // signout
              vm.authObj.$signOut();
            }

    }

}
