



module.exports = function(ngApp) {  

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

  ngApp
    .config(['$firebaseRefProvider', function($firebaseRefProvider) {
      $firebaseRefProvider.registerUrl({
        default: config.databaseURL,
        cases: config.databaseURL + '/cases'
      })
    }])


// routing with ui-router
    .config([ '$locationProvider', 
              '$stateProvider', 
              '$urlRouterProvider', 
              function config( $locationProvider, 
                               $stateProvider, 
                               $urlRouterProvider) {

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('appContainer',{
        component: 'appContainer'
      })
      
      .state('home', {
        url: '/',
        component: 'home',
        parent: 'appContainer'
      })
      .state('cases', {
        component: 'caseList',
        parent: 'appContainer',
        resolve: {
          caseList: ['$firebaseAuth', 'caseService', function($firebaseAuth, caseService) {
                      return $firebaseAuth().$requireSignIn()
                              .then(function(user){
                                return caseService.LoadAllCases();
                              })
                              .catch(function(err){
                                return 'not logged in'
                              })
                    }]
        }
      })
      .state('cases.case', {
        url: '/case-list',
        component: 'caseExpanded'
      })

      .state('caseMain', {
        url: '/case',
        component: 'caseMain',
        parent: 'appContainer',
        resolve: {
          caseList: ['$firebaseAuth', 'caseService', function($firebaseAuth, caseService) {
                      return $firebaseAuth().$requireSignIn()
                              .then(function(user){
                                return caseService.LoadAllCases();
                              })
                              .catch(function(err){
                                return 'not logged in'
                              })
                    }]
        }
      })

      .state('caseMain.caseXV', {
        url: '/{caseId}',
        component: 'caseXV'
      })


      .state('newCase', {
        url:'/createCase',
        component: 'newCase',
        parent: 'appContainer'
      })

      .state('newCaseForm', {
        parent: 'newCase',
        component: 'caseXV'
      })
        
      .state('legacyforms', {
        url: '/legacyforms',
        component: 'legacyViews',
        parent: 'appContainer'
      })

      .state('login', {
        url: '/login',
        component: 'userAuthentication'
      })
      .state('caseMain', {
        url: '/case',
        component: 'caseMain'
      })
      .state('legacyforms', {
        url: '/legacyforms',
        component: 'legacyViews'
      })

    }])

    
  // material design config for theming, etc.
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('indigo')
    }])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('Auth')
        .primaryPalette('red')
        .accentPalette('indigo', {
          'default' : '600'
        })
    }])
    

  

}
