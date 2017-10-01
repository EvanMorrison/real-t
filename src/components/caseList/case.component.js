module.exports = function(app) {
  app
    .component('caseExpanded', {
      template: require('./case.template.html'),
      controller: [
                      'phoneFilter',
                      CaseController
                  ],
      controllerAs: 'vm',
      bindings: { caseExpanded: '<',
                  selectedCase: '<',
                  index: '<'}
    });

    function CaseController(phoneFilter) {
      const vm = this;
    }

    // filter for formatting phone numbers
  app.filter('phone', function() {
    return function(tel) {
      if (!tel) { return '' };

      const phone = tel.slice(0,3) + '-' + tel.slice(3,6) + '-' + tel.slice(6);
      return phone;

    }
  })

}
