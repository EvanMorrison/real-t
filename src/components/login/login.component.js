(function() {

  angular.module('RTApp')
    .component('userAuthentication', {
      templateUrl: 'components/login/login.template.html',
      controller: [UserAuthController],
      controllerAs: 'ctrl'
    });

    function UserAuthController() {
      const ctrl = this;

      ctrl.auth = firebase.auth();

      ctrl.login = function($event) {
        $event.preventDefault();

        // user login
        ctrl.auth.signInWithEmailAndPassword(ctrl.user.email, ctrl.user.password)
          .then(function(res) {
            console.log('signin successfull ', res)
            ctrl.isLoggedIn = true;
        }, function(e) {

        })  
      }

      // user signup
      ctrl.signup = function($event) {
        $event.preventDefault();
        // sign up
        ctrl.auth.createUserWithEmailAndPassword(ctrl.user.email, ctrl.user.password)
        .catch(function(e) {
          console.log('error ', e.message)
        })
      }

      // user signout
      ctrl.signOut = function($event) {
        $event.preventDefault();
        // signout
        ctrl.isLoggedIn = false;
        ctrl.auth.signOut();
      }

        // add a realtime user auth listener
        firebase.auth().onAuthStateChanged(function(firebaseUser) {
          if(firebaseUser) {
            console.log(firebaseUser) 
            ctrl.isLoggedIn = true;
          } else {
            console.log('not logged in')
            ctrl.isLoggedIn = false;
          }
        })

    }
  
}());