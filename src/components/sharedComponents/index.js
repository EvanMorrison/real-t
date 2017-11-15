module.exports = function(app) {
  
  require('./cards')(app);
  require('./editButton/editButton.component')(app);
  require('./editToolbar/editToolbar.component')(app);
  
}