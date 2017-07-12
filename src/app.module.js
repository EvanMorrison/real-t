import './main.css';
import './animations.css';
  




const app = angular.module('RTApp', [
    'firebase',
    'ngMaterial',
    'ui.router',
    'CaseList'
  ])
  
  
require('./app.config')(app);
require('./services/Case.Service')(app);

require('./components/appContainer/appContainer.component')(app);
require('./components/mainLayout/mainLayout.controller')(app);
require('./components/navbar/navbar.component')(app);
require('./components/hero/hero.component')(app);
require('./components/home/home.component')(app);
require('./components/login/login.component')(app);
require('./components/legacyViews/legacyViews.component')(app);


const CaseList = angular.module('CaseList', []);

require('./components/caseList/caseList.component')(CaseList);
require('./components/caseList.case/case.component')(CaseList);


require('./components/caseDashboard')(app);
require('./components/newCase/newCase.component')(app);