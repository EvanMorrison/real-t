module.exports = function(app) {
  
  require('./cards.component')(app);
  require('./personCard.component')(app);
  require('./propertyCard.component')(app);
  require('./loanCard.component')(app);
  require('./contentTemplates/personInfo.component')(app);
  require('./contentTemplates/propertyInfo.component')(app);
  require('./contentTemplates/loanInfo.component')(app);
  require('./contentTemplates/documentInfo.component')(app);
}