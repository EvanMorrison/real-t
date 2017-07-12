
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
                  'isLoggedIn': '<'
      }
    });

    function LoginController($mdDialog, $state, $firebaseAuth) {
      const vm = this;
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
              // user login
              vm.authObj.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(res) {
                  console.log('signin successfull')
                  vm.isLoggedIn = true;
                  vm.user.email = '';
                  vm.user.password = '';
              }, function(err) {
                    vm.showAlert(err)
                    console.log('error on sign in ', err)
              })  
            }

            // anonymous login
            vm.loginAnonymous = function($event) {
              $event.preventDefault();
              
                vm.authObj.$signInAnonymously()
                .then(function(res){
                  vm.isLoggedIn = true;
                  console.log('anonymous signin successful ', res)
                })
                .catch(function(err) {
                  vm.showAlert(err)
                  console.log('error with anonymous sign in ', err)
                })
          }

          // Google OAuth login
          vm.loginWithGoogle = function($event) {
            $event.preventDefault();
            vm.authObj.$signInWithPopup('google')
            .then(function(result) {
                  vm.user = result.user
            }, function(err) {
              console.log('OAuth sign in failed ', err)
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
              // sign up
              vm.authObj.$createUserWithEmailAndPassword(vm.user.email, vm.user.password)
              .then(function(user){
                vm.isLoggedIn = true;
                vm.user.email = '';
                vm.user.password = '';
              })
              .catch(function(e) {
                console.log('error ', e.message)
                vm.isLoggedIn = false;
              })
            }

            // user signout
            vm.signOut = function($event) {
              $event.preventDefault();
              // signout
              vm.isLoggedIn = false;
              vm.authObj.$signOut();
            }

              // add a realtime user auth listener
              vm.authObj.$onAuthStateChanged(function(firebaseUser) {
                if(firebaseUser) {
                  vm.isLoggedIn = true;
                  $state.go('home')
                } else {
                  console.log('Auth state changed, not logged in')
                  vm.isLoggedIn = false;
                }
              })
          }

}
