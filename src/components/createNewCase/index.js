module.exports = function(app) {
  require('./newCaseStyles.scss');
  require('./caseSetup.component')(app);
  require('./addProfile.component')(app);
}