
// Container Component for Login-sidebar, user authentication, and all content views
module.exports = function(ngModule) {
  ngModule
    .component('appContainer', {
      template: require('./appContainer.template.html'),
      controller: [ '$firebaseAuth', AppContainerController],
      controllerAs: 'ctrl'
    });

    function AppContainerController($firebaseAuth) {
      const ctrl = this;
      ctrl.isLoggedIn = false;

      
      ctrl.authObj = $firebaseAuth();
      console.log('authObj ', ctrl.authObj)
      

      // login with email and password
      ctrl.login = function($event) {
        $event.preventDefault();
        // user login
        ctrl.authObj.$signInWithEmailAndPassword(ctrl.user.email, ctrl.user.password)
          .then(function(res) {
            console.log('signin successfull')
            ctrl.isLoggedIn = true;
            ctrl.user.email = '';
            ctrl.user.password = '';
        }, function(err) {
              console.log('error on sign in ', err)
        })  
      }

      // anonymous login
      ctrl.loginAnonymous = function($event) {
        $event.preventDefault();
        
          ctrl.authObj.$signInAnonymously()
          .then(function(res){
            ctrl.isLoggedIn = true;
            console.log('anonymous signin successful ', res)
          })
          .catch(function(err) {
            console.log('error with anonymous sign in ', err)
          })
    }

    // Google OAuth login
    ctrl.loginWithGoogle = function($event) {
      $event.preventDefault();
      ctrl.authObj.$signInWithPopup('google')
      .then(function(result) {
          console.log(result)
            ctrl.user = result.user
      }, function(err) {
        console.log('OAuth sign in failed ', err)
      })
    }


    // // Facebook OAuth login
    // ctrl.loginWithFacebook = function($event) {
    //   $event.preventDefault();
    //   ctrl.authObj.$signInWithPopup('facebook')
    //   .then(function(result) {
    //       console.log(result)
    //         ctrl.user = result.user
    //   }, function(err) {
    //     console.log('OAuth sign in failed ', err)
    //   })
    // }

      // user signup with email & password
      ctrl.signup = function($event) {
        $event.preventDefault();
        // sign up
        ctrl.authObj.$createUserWithEmailAndPassword(ctrl.user.email, ctrl.user.password)
        .then(function(user){
          ctrl.isLoggedIn = true;
          ctrl.user.email = '';
          ctrl.user.password = '';
        })
        .catch(function(e) {
          console.log('error ', e.message)
          ctrl.isLoggedIn = false;
        })
      }

      // user signout
      ctrl.signOut = function($event) {
        $event.preventDefault();
        // signout
        ctrl.isLoggedIn = false;
        ctrl.authObj.$signOut();
      }

        // add a realtime user auth listener
        ctrl.authObj.$onAuthStateChanged(function(firebaseUser) {
          if(firebaseUser) {
            ctrl.isLoggedIn = true;
          } else {
            console.log('Auth state changed, not logged in')
            ctrl.isLoggedIn = false;
          }
        })
    }

}
