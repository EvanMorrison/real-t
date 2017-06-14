(function() {

  angular.module('FCMaxApp')
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function config($locationProvider, $stateProvider, $urlRouterProvider) {
      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('home', {
          url: '/',
          component: 'home'
        })

    }])

})();
