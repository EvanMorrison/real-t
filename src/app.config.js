



module.exports = function(ngApp) {  

  ngApp

 // material design config for theming, etc.
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple', {
          'default' : '400',
          'hue-1': '100',
          'hue-2' : '600',
          'hue-3' : 'A100'
        })
        .accentPalette('green', {
          'default' : '600',
          'hue-1' : '100',
          'hue-2' : '600',
          'hue-3' : 'A100'
        })
    }])
    .config(['$mdThemingProvider', function($mdThemingProvider) {
      $mdThemingProvider.theme('Auth')
        .primaryPalette('red')
        .accentPalette('light-blue', {
          'default' : '600'
        })
    }])
    


// routing with ui-router
    .config([ '$locationProvider', 
              '$stateProvider', 
              '$urlRouterProvider', 
              RoutingConfig
            ]);

      function RoutingConfig( $locationProvider, 
                              $stateProvider, 
                              $urlRouterProvider) {

          $locationProvider.html5Mode(true);

          $urlRouterProvider.otherwise('/');

          $stateProvider
          .state('index',{
            // abstract: true,
            // appContainer is a component used to manage the user state for the entire app
            component: 'appContainer',
            resolve: {
              'user': ['localAuthService', function(localAuthService) {
                return localAuthService.getUser().then( (usr) => usr);
              }]
            }
          })
             // mainLayout is the parent container for header/navigation and content views 
              .state('mainLayout', {
                parent: 'index',
                abstract: true,
                views: {
                  '@index': { component: 'mainLayout' }
                }
              })

                  .state('home', {
                    url: '/',
                    parent: 'mainLayout',
                    views: {
                      'headerContent@mainLayout': { component: 'hero' },
                      'bodyContent@mainLayout': { component: 'home' }
                    }
                  })

                  .state('login', {
                    url: '/login',
                    // parent: 'mainLayout',
                    views: {
                      '@': { component: 'loginComponent'}
                    }
                  })

                  .state('caseList', {
                    parent: 'mainLayout',
                    url: '/list-view',
                    views: {
                      'headerContent@mainLayout': { component: 'navbar' },
                      'bodyContent@mainLayout': { component: 'caseList' },
                      '@caseList': { component: 'caseExpanded' }
                    },
                    resolve: {
                      caseList: ['caseService', function(caseService) {
                                            return caseService.loadCaseList();
                                }]
                    }
                  })

                  .state('caseDataContainer', {
                    abstract: true,
                    parent: 'mainLayout',
                    views: {
                      'headerContent@mainLayout': { component: 'navbar'},
                      'bodyContent@mainLayout': {component: 'rtCaseDataContainer'}
                    }
                  })

                  .state('caseDashboard', {
                    url: '/dashboard',
                    parent: 'caseDataContainer',
                    params: { 'caseNum': null },
                    views: {
                      'view@caseDataContainer': { component: 'caseDashboard' }
                    },
                    resolve: {
                      caseList: ['caseService', function(caseService) {
                                                  return caseService.loadCaseList();
                                              }]
                    }
                  })
                      .state('caseFocus', {
                        url: '/{caseNum}',
                        parent: 'caseDashboard',
                        params: { 'case_id': null },
                        views: {
                          'timeline@caseDashboard': { component: 'timeline' },
                          'info@caseDashboard': { component: 'rtCaseInfo' },
                        }
                      })

                    .state('caseSetupStart', {
                      url: '/case-setup',
                      parent: 'caseDataContainer',
                      views: {
                        'view@caseDataContainer': { component: 'rtCaseSetup'}
                      },
                    })

                    .state('caseSetup', {
                      url: '/{caseNum}',
                      parent: 'caseSetupStart',
                      params: {'case_id': null},
                      views: {
                        'view@caseDataContainer': { component: 'rtCaseSetup'}
                      }
                    })

                  .state('legacyforms', {
                    url: '/legacyforms',
                    parent: 'mainLayout',
                    views: {
                      'headerContent@mainLayout': { component: 'navbar'},
                      'bodyContent@mainLayout': { component: 'legacyViews'}
                    },
                  })

      }

    
 
  

}