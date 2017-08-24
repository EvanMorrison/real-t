import './main.scss';
import './animations.scss';

const app = angular.module('RTApp', [
                                      'firebase',
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


const CaseList = angular.module('CaseList', []);

require('./components/caseList/caseList.component')(CaseList);
require('./components/caseList.case/case.component')(CaseList);

const CaseMain = angular.module('CaseMain', []);

require('./components/caseMain/caseMain.component')(CaseMain);
require('./components/caseMain.caseXV/caseXV.component')(CaseMain);
require('./components/newCase/newCase.component')(CaseMain);