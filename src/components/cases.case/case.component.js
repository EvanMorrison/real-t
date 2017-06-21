(function() {
  angular.module('Cases')
    .component('case', {
      templateUrl: 'components/cases.case/case.template.html',
      controller: [CaseController],
      controllerAs: 'ctrl',
      bindings: { case: '<'}
    });

    function CaseController() {
      const ctrl = this;
      
    }

    // filter for formatting phone numbers
  angular.module('Cases').filter('tel', function() {
    return function(tel) {
      if (!tel) { return '' };

      const phone = tel.slice(0,3) + '-' + tel.slice(3,6) + '-' + tel.slice(6);
      return phone;

    }
  })

})();