(function() {

  angular.module('CaseMain', [])
    .config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  })

  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: [CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'case': '<'}
  });

    function CaseMainController() {
      const ctrl = this;
      
      
      /**
       * fix posiitioning of datepicker, which otherwise 
       * is positioned off screen.
       */
      ctrl.positionDatepicker = function($event) {
        
          // get md-input-container parent of the clicked button
          let pickerContainer = angular.element($event.target).parent().parent()

          // handle case of right hand button rather than left hand button, which are
          // on different levels
         
          const pcName = pickerContainer.prop('nodeName');
          if (pcName === 'MD-DATEPICKER') {
            pickerContainer = pickerContainer.parent()
          } else if (pcName === 'DIV') {
            pickerContainer = pickerContainer.parent().parent()
          }
          // get position of the container element
          const pcPosition = pickerContainer.prop('offsetTop');

          // get the datepicker pane element, which when opened is always added at 
          // the end of <body>
          const dpickerPane = angular.element(document.querySelector('body').lastChild);

          // move the datepicker pane to be near its input container button
          if (dpickerPane.hasClass('md-datepicker-calendar-pane')) {
            dpickerPane.css('top', pcPosition + 300 + 'px');
          }
      }
      
      // data for testing
      ctrl.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]

      
    }


})();
