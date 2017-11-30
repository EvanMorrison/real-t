module.exports = function(app) {
   app
      .component('navbar', {
        template: require('./navbar.template.html'),
        controller: [ NavbarController ],
        controllerAs: 'vm',
        bindings: {
                    user: '<',
                    onSignout: '&'
        }
      });


      function NavbarController() {
        const vm = this;
        
        

        vm.signout = function() {
          console.log('trying to signout');
          vm.onSignout();
        }
        
      }
}