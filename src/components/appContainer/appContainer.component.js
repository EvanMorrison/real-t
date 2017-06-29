(function() {

  angular.module('RTApp')
    .component('appContainer', {
      templateUrl: 'components/appContainer/appContainer.template.html',
      controller: ['$firebaseAuth', AppContainerController],
      controllerAs: 'ctrl'
    });

    function AppContainerController($firebaseAuth) {
      const ctrl = this;
      ctrl.isLoggedIn = false;

      
      ctrl.authObj = $firebaseAuth();
      console.log('authObj ', ctrl.authObj)
      


      ctrl.login = function($event) {
        $event.preventDefault();

        // user login
        ctrl.authObj.$signInWithEmailAndPassword(ctrl.user.email, ctrl.user.password)
          .then(function(res) {
            console.log('signin successfull ', res)
            ctrl.isLoggedIn = true;
            ctrl.user.email = '';
            ctrl.user.password = '';
        }, function(err) {
              console.log('error on sign in ', err)
        })  
      }

      // user signup
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
            console.log(firebaseUser) 
            ctrl.isLoggedIn = true;
          } else {
            console.log('not logged in')
            ctrl.isLoggedIn = false;
          }
        })
    }

}());