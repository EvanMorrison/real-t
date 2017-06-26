(function() {

  angular.module("RTApp")
    .component('home', {
      templateUrl: 'components/home/home.template.html',
      controller: HomeController,
      controllerAs: 'ctrl'
    });

    function HomeController() {
      const ctrl = this;
        
      
    }

})();