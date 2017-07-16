module.exports = function(app) {
   app
      .component('navbar', {
        template: require('./navbar.template.html'),
        controller: [ NavbarController ],
        controllerAs: 'vm',
        bindings: {
                    'user': '<',
                    'onLogout': '&'
        }
      });


      function NavbarController() {
        const vm = this;

        vm.logout = function() {
          console.log('trying to logout');
          vm.onLogout();
        }
        
      }
}