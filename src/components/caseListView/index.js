module.exports = function(app) {
  require('./listView.scss');
  require('./listView.service')(app);
  require('./caseList.component')(app);
  require('./case.component')(app);
}