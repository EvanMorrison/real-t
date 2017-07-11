
module.exports = function(ngModule) {
  ngModule
      .component('legacyViews', {
        template: require('./legacyViews.template.html'),
        controller: [LegacyController],
        controllerAs: 'ctrl'
      });

        function LegacyController() {
          const ctrl = this



        }

}
