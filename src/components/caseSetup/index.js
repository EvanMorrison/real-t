module.exports = function(app) {
  require('./caseSetupStyles.scss');
  require('./caseSetup.component')(app);
  require('./addProfile.component')(app);
  require('./profileLookup.component')(app);
}