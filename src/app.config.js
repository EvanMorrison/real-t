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

  
  angular.module('RTApp')

    .config(function($firebaseRefProvider) {
      $firebaseRefProvider.registerUrl({
        default: config.databaseURL,
        cases: `${config.databaseURL}/cases`
      })
    })



// routing with ui-router
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function config($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('home', {
        url: '/',
        component: 'home'
      })
      .state('cases', {
        url: '/cases',
        component: 'cases',
        resolve: {
          caseList: function(caseService) {
            return caseService.LoadAllCases();
          }
        }
      })
      .state('cases.case', {
        url: '/{caseId}',
        component: 'case'
      })

      .state('caseMain', {
        url: '/case',
        params: { directId: null } ,
        component: 'caseMain'
      })
        .state('caseMain.caseXV', {
          url: '/{caseId}',
          component: 'caseXV'
        })

        
      .state('legacyforms', {
        url: '/legacyforms',
        component: 'legacyViews'
      })

      .state('login', {
        url: '/login',
        component: 'userAuthentication'
      })

    }])

    
  // material design config for theming, etc.
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
    })
    

  

})();
