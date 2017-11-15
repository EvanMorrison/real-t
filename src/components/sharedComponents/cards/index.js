module.exports = function(app) {
  
  require('./cards.component')(app);
  require('./personCard.component')(app);
  require('./propertyCard.component')(app);
  require('./loanCard.component')(app);
  require('./contentTemplates/personView.component')(app);
  require('./contentTemplates/personEdit.component')(app);
}