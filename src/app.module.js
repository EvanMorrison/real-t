(function() {

  


  angular.module('RTApp', [
    'firebase',
    'ngMaterial',
    'ui.router',
    'Cases',
    'CaseMain'
  ])
  .controller('isAuthController', ['$firebaseAuth', IsAuthController])

    function IsAuthController($firebaseAuth) {
      const ctrl = this;
      
      ctrl.authObj = $firebaseAuth();
      
      // synchronous method to get the current user login status
      let authState = ctrl.authObj.$getAuth();
        if(authState) {
          ctrl.isLoggedIn = true;
        } else {
          ctrl.isLoggedIn = false;
        }

        // watch for changes in authentication state
        ctrl.authObj.$onAuthStateChanged(function(authData){
          if (authData) {
            ctrl.isLoggedIn = true;
            if (authData.isAnonymous) {
              ctrl.user = 'anonymously'
            } else if (authData.displayName) {
              ctrl.user = authData.displayName
            } else if (authData.email) {
              ctrl.user = authData.email
            } else {
              ctrl.user = ''
            }

          } else {
            ctrl.isLoggedIn = false;
          }
        })
        
      // let the user log out
      ctrl.logout = function() {
        ctrl.authObj.$signOut();
        ctrl.isLoggedIn = false
      }
    }
  
}());