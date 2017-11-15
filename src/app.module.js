import './main.scss';
import './animations.scss';

const app = angular.module('RTApp', [
                                      'ngMaterial',
                                      'ngMessages',
                                      'ngResource',
                                      'ngCookies',
                                      'ui.router'
                                    ]);
  
  
require('./app.config')(app);
require('./services')(app);

require('./components/appContainer/appContainer.component')(app);
require('./components/mainLayout/mainLayout.controller')(app);
require('./components/navbar/navbar.component')(app);
require('./components/home')(app);
require('./components/login/login.component')(app);
require('./components/legacyViews/legacyViews.component')(app);

require('./components/cardComponents')(app);

require('./components/caseList')(app);

require('./components/caseDashboard')(app);

require('./components/newCase')(app);
