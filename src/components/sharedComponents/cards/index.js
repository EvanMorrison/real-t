module.exports = function(app) {
  require('./infoCard.scss');
  require('./cards.component')(app);
  require('./contentComponents/personInfo.component')(app);
  require('./contentComponents/propertyInfo.component')(app);
  require('./contentComponents/loanInfo.component')(app);
  require('./contentComponents/documentInfo.component')(app);
}