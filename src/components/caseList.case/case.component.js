module.exports = function(ngModule) {
  ngModule
    .component('caseExpanded', {
      template: require('./case.template.html'),
      controller: [CaseController],
      controllerAs: 'ctrl',
      bindings: { caseExpanded: '<',
                  selectedCase: '<',
                  index: '<'}
    });

    function CaseController() {
      const ctrl = this;
    }

    // filter for formatting phone numbers
  angular.module('CaseList').filter('tel', function() {
    return function(tel) {
      if (!tel) { return '' };

      const phone = tel.slice(0,3) + '-' + tel.slice(3,6) + '-' + tel.slice(6);
      return phone;

    }
  })

}