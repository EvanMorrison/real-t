(function() {

  angular.module('RTApp')

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
          case: function($firebaseObject) {
            const rootref = firebase.database().ref().child('cases')
            const ref = rootref.child('17-62829')
            return $firebaseObject(ref)
          }
        }
        
                
      })

      .state('legacyforms', {
        url: '/legacyforms',
        component: 'legacyViews'
      })

    }])

    
  // material design config for theming, etc.
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
    })
    

  

})();
