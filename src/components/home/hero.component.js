import template from './hero.template.html';

export default function(app) {
  app
    .component('hero', {
      template,
      controller: [HeroController],
      controllerAs: 'vm',
      bindings: {
                  'user': '<'
      }
    });

    function HeroController() {
        const vm = this;

        vm.$onChanges = function() {
          if (vm.user && vm.user.isSignedIn) {
            vm.message = 'Where Would You Like to Start?'
          } else {
            vm.message = 'Sign In to Get Started.'
          }
        }
        


    }

}
