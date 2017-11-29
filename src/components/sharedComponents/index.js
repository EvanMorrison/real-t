module.exports = function(app) {
  
  require('./profileComponents')(app);
  require('./editButton/editButton.component')(app);
  require('./editToolbar/editToolbar.component')(app);
  
}