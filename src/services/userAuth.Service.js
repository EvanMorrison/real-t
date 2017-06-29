(function() {

  angular.module('RTApp')
  .service('authService', ['$firebaseAuth', isLoggedIn] )


  function isLoggedIn() {
      let auth = $firebaseAuth().$getAuth();
      if (auth) {
        return true;
      } else {
        return false;
      }

    
  }

}());