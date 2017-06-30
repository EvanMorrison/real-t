(function() {

  


  angular.module('RTApp', [
    'firebase',
    'ngMaterial',
    'ui.router',
    'CaseList',
    'CaseMain'
  ])
  .controller('isAuthController', ['$firebaseAuth', IsAuthController])

    function IsAuthController($firebaseAuth) {
      const ctrl = this;
      ctrl.isLoggedIn = true;

      ctrl.authObj = $firebaseAuth();

        // watch for changes in authentication state
        ctrl.authObj.$onAuthStateChanged(function(authData){
          if (authData) {
            ctrl.isLoggedIn = true;
            if (authData.isAnonymous) {
              ctrl.user = 'anonymous'
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