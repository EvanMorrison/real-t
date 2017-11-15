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

require('./containerComponents/appContainer.component')(app);
require('./containerComponents/mainLayout.component')(app);

require('./components/login/login.component')(app);
require('./components/navbar/navbar.component')(app);
require('./components/home')(app);

require('./components/caseListView')(app);
require('./components/caseDetailView')(app);
require('./components/createNewCase')(app);
require('./components/legacyViews/legacyViews.component')(app);

require('./components/sharedComponents')(app);


