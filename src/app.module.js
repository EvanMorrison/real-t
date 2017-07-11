import './main.css';
import './animations.css';
  




const app = angular.module('RTApp', [
    'firebase',
    'ngMaterial',
    'ui.router',
    'CaseList',
    'CaseMain'
  ])
  .controller('isAuthController', ['$firebaseAuth', IsAuthController])

            function IsAuthController($firebaseAuth) {
              const ctrl = this;
              ctrl.isLoggedIn = true;
              ctrl.authObj = $firebaseAuth();

                // watch for changes in authentication state
                ctrl.authObj.$onAuthStateChanged(function(authData){
                  if (authData) {
                    ctrl.isLoggedIn = true;
                    if (authData.isAnonymous) {
                      ctrl.user = 'anonymous'
                    } else if (authData.displayName) {
                      ctrl.user = authData.displayName
                    } else if (authData.email) {
                      ctrl.user = authData.email
                    } else {
                      ctrl.user = ''
                    }

                  } else {
                    ctrl.isLoggedIn = false;
                  }
                })
                
              // let the user log out
              ctrl.logout = function() {
                ctrl.authObj.$signOut();
                ctrl.isLoggedIn = false
              }
    }
  
require('./app.config')(app);
require('./services/Case.Service')(app);

require('./components/appContainer/appContainer.component')(app);

require('./components/home/home.component')(app);
require('./components/legacyViews/legacyViews.component')(app);


const CaseList = angular.module('CaseList', []);

require('./components/caseList/caseList.component')(CaseList);
require('./components/caseList.case/case.component')(CaseList);

const CaseMain = angular.module('CaseMain', []);

require('./components/caseMain/caseMain.component')(CaseMain);
require('./components/caseMain.caseXV/caseXV.component')(CaseMain);
require('./components/newCase/newCase.component')(CaseMain);