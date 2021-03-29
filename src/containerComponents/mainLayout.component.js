import template from './mainLayout.template.html';

export default function(app) {
  app
    .component('mainLayout', {
      template,
      controller: [MainLayoutController],
      controllerAs: 'vm',
      bindings: {
                  'user': '<',
                  'onSignout': '&'

      }
    });

    function MainLayoutController () {
      const vm = this;


    }
}
