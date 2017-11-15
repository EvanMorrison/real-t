module.exports = function(app) {
  require('./caseSetupStyles.scss');
  require('./profileLookup.component')(app);
  require('./people')(app);
  require('./caseSetup.component')(app);
  require('./property/addProperty.component')(app);
  require('./loan/addLoan.component')(app);
  require('./documents/addDocuments.component')(app);
}