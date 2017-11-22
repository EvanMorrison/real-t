module.exports = function(app) {
  require('./caseDetail.scss');
  require('./caseDashboard.component')(app);
  require('./timeline.component')(app);
  require('./detailsContainer.component')(app);
}