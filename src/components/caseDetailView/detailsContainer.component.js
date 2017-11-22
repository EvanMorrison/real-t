module.exports = function(app) {
  app.component('rtDetailsContainer', {
    template: require('./detailsContainer.template.html'),
    controller: [ DetailsController],
    controllerAs: 'vm',
    bindings: {
                'case': '<'
    }
  })

  function DetailsController() {
    const vm = this;
    vm.$onInit = () => {
      vm.sections = ['lender', 'borrower', 'property', 'documents', 'loan', 'lenderAttorney', 'borrowerAttorney','otherParties'];
      let lender = { title: 'Lender', 
                     apiPath: 'people', 
                     acKeys: ['name']};
      let borrower = Object.assign({},lender,{title: 'Borrower'});
      let lenderAttorney = Object.assign({},lender,{title: 'Lender Attorney'}, {acFilter: 'attorney'});
      let borrowerAttorney = Object.assign({},lenderAttorney,{title: 'Borrower Attorney'});
      let otherParties = Object.assign({},lender,{title: 'Other Parties'});
      let property = { title: 'Property', apiPath: 'properties', acKeys: ['county','taxParcelId']};
      let documents = { title: 'Trust Deed', apiPath: 'documents', acKeys: ['county','entryNo']};
      let loan = { title: 'Loan', apiPath: 'cases'};
      vm.props = { lender, borrower, lenderAttorney, borrowerAttorney, otherParties, property, documents, loan};
    
    }
  }
}