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
          cases: function(caseService) {
            return caseService.LoadAllCases();
          }
        }
      })
      .state('cases.case', {
        url: '/{fileId}',
        component: 'case',
        resolve: {
          case: function(cases, $stateParams) {
            return cases.find(function(c){
              return c.file === $stateParams.fileId
            })
            }
          }
      })

      .state('caseMain', {
        url: '/case',
        component: 'caseMain',
        resolve: {
          case: function(caseService) {
              return caseService.getFullCase('16-77810');
          }
        }
      })
        .state('fullCase', {
          url: 'case/{caseId}',
          component: 'caseMain',
          resolve: {
            fullCase: function(caseService, $stateParams) {
              return caseService.getFullCase($stateParams.caseId);
            }
          }
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
