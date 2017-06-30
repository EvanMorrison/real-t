(function() {
  angular.module('CaseList')
    .component('caseExpanded', {
      templateUrl: 'components/caseList.case/case.template.html',
      controller: [CaseController],
      controllerAs: 'ctrl',
      bindings: { caseExpanded: '<'}
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

})();