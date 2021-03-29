import template from './timeline.template.html';

export default function(app) {
  app 
    .component('timeline', {
      template,
      controller: [
                    TimelineController
                  ],
      controllerAs: 'vm'
    });

    function TimelineController() {
      const vm = this;

        vm.progressValue = Math.random()*100;
    }
}
