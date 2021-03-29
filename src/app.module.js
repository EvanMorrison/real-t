import './main.scss';
import './animations.scss';
import '../node_modules/angular-material/angular-material.scss';
import angular from 'angular';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngResource from 'angular-resource';
import ngCookies from 'angular-cookies';
import config from './app.config';
import coreServices from './coreServices';
import appContainer from './containerComponents/appContainer.component';
import mainLayout from './containerComponents/mainLayout.component';
import caseData from './containerComponents/caseData.container';
import loginComponent from './components/login/login.component';
import navbar from './components/navbar/navbar.component';
import home from './components/home';
import caseListView from './components/caseListView';
import caseDetailView from './components/caseDetailView';
import caseSetup from './components/caseSetup';
import legacyViews from './components/legacyViews/legacyViews.component';
import sharedComponents from './components/sharedComponents';
import uiRouter from '@uirouter/angularjs';

const app = angular.module('RTApp', [
  ngMaterial,
  ngMessages,
  ngResource,
  ngCookies,
  uiRouter,
]);

export default app;

config(app);
coreServices(app);
appContainer(app);
mainLayout(app);
caseData(app);

loginComponent(app);
navbar(app);
home(app);
caseListView(app);
caseDetailView(app);
caseSetup(app);
legacyViews(app);
sharedComponents(app);

