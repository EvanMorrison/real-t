(function() {

  angular.module('FCMaxApp')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function config($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
      // .state('home', {
      //   url: '/',
      //   component: 'cases'
      // })
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

    }])

    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('light-blue')
    })

})();
