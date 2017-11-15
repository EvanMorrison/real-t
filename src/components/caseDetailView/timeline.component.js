module.exports = function(app) {
  app 
    .component('timeline', {
      template: require('./timeline.template.html'),
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