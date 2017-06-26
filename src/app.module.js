(function() {

    // config and initialize firebase
  const config = {
    apiKey: "AIzaSyBfxeu8LggGmAgO4fMn1AsNxkzmpwf6d6g",
    authDomain: "real-t-e5280.firebaseapp.com",
    databaseURL: "https://real-t-e5280.firebaseio.com",
    projectId: "real-t-e5280",
    storageBucket: "real-t-e5280.appspot.com",
    messagingSenderId: "586766522818"
  };
  firebase.initializeApp(config);



  angular.module('RTApp', [
    'ngMaterial',
    'ui.router',
    'firebase',
    'Cases',
    'CaseMain'
  ])

  
}());