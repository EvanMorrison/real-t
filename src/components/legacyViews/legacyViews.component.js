import template from './legacyViews.template.html';

export default function(ngModule) {
  ngModule
      .component('legacyViews', {
        template,
        controller: [LegacyController],
        controllerAs: 'ctrl'
      });

        function LegacyController() {
          const ctrl = this



        }

}
