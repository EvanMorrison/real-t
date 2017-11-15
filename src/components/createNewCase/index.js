module.exports = function(app) {
  require('./newCaseStyles.scss');
  require('./caseSetup.component')(app);
  require('./newCaseCard.component')(app);
}