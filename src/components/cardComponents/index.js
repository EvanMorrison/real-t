module.exports = function(app) {
  
  require('./editButton/editButton.component')(app);
  require('./cards.component')(app);
  require('./personCard.component')(app);
  require('./propertyCard.component')(app);
  require('./loanCard.component')(app);
  require('./contentTemplates/personView.directive')(app);
  require('./contentTemplates/personEdit.directive')(app);
}