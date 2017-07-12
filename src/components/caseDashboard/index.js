module.exports = function(app) {
  require('./caseDashboard.component')(app);
  require('./fullDetail.component')(app);
  require('./editToolbar.component')(app);
}