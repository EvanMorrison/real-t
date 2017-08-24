import './main.scss';
import './animations.scss';
// import 'angular';
// import 'angular-material';

const app = angular.module('RTApp', [
                                      'firebase',
                                      'ngMaterial',
                                      'ngMessages',
                                      'ngResource',
                                      'ui.router'
                                    ]);
  
  
require('./app.config')(app);
require('./services/caseService.Service')(app);

require('./components/appContainer/appContainer.component')(app);
require('./components/mainLayout/mainLayout.controller')(app);
require('./components/navbar/navbar.component')(app);
require('./components/hero/hero.component')(app);
require('./components/home/home.component')(app);
require('./components/login/login.component')(app);
require('./components/legacyViews/legacyViews.component')(app);

require('./components/caseList')(app);

require('./components/caseDashboard')(app);

require('./components/newCase/newCase.component')(app);
