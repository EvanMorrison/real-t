(function() {

  angular.module('Navbar', [])

    .component('navbar', {
      templateUrl: '/components/navbar/navbar.template.html',
      controller: [NavbarController],
    });

    function NavbarController () {
      const $ctrl = this;
    }

})();

