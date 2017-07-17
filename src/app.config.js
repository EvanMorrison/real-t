



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
  // initialize firebaseRefProvider
    .config(['$firebaseRefProvider', function($firebaseRefProvider) {
      $firebaseRefProvider.registerUrl({
        default: config.databaseURL,
        cases: config.databaseURL + '/cases'
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
            abstract: true,
            // appContainer is a component used to manage the user state for the entire app
            component: 'appContainer'
          })
          
              .state('mainLayout', {
                parent: 'index',
                abstract: true,
                component: 'mainLayout'
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
                    parent: 'mainLayout',
                    views: {
                      'bodyContent@mainLayout': { component: 'loginComponent'}
                    }
                  })

                  .state('caseList', {
                    parent: 'mainLayout',
                    url: '/case-list',
                    views: {
                      'headerContent@mainLayout': { component: 'navbar' },
                      'bodyContent@mainLayout': { component: 'caseList' },
                      '@caseList': { component: 'caseExpanded' }
                    },
                    resolve: {
                      caseList: ['caseService', function(caseService) {
                                            return caseService.LoadAllCases();
                                }]
                    }
                  })

                  .state('caseDashboard', {
                    url: '/dashboard',
                    parent: 'mainLayout',
                    params: { isNewCase: null },
                    views: {
                      'headerContent@mainLayout': { component: 'navbar' },
                      'bodyContent@mainLayout': { component: 'caseDashboard' }
                    },
                    resolve: {
                      caseList: ['caseService', function(caseService) {
                                                  return caseService.LoadAllCases()
                                                  
                                              }]
                    }
                  })
                      .state('caseFocus', {
                        url: '/{recordId}',
                        parent: 'caseDashboard',
                        views: {
                          'timeline@caseDashboard': { component: 'timeline' },
                          'editToolbar@caseDashboard': { component: 'editToolbar' },
                          'fullDetail@caseDashboard': { component: 'fullDetail'}
                        }
                      })

                    .state('newCase', {
                      url: '/create-new-case',
                      parent: 'caseDashboard',
                      views: {
                        'newCase@caseDashboard': { component: 'newCase' },
                        '@newCase': { component: 'fullDetail' },
                        'fullDetail@caseDashboard': ''
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