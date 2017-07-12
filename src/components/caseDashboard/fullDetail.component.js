
module.exports = function(ngModule) {
  ngModule
  .component('fullDetail', {
    template: require('./fullDetail.template.html'),
    controller: [FullDetailController],
    controllerAs: 'vm',
    bindings: { case: '<',
                isActiveEdit: '<',
                isCaseIdValid: '<',
                onUpdate: '&'}
  })

  function FullDetailController() {
    const vm = this;
    vm.$onInit = function() {
     
    }
    
    vm.update = function() {
        vm.onUpdate()
    }


        // county selection input options
      vm.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]
          

     /**
           * fix posiitioning of datepicker, which otherwise 
           * is positioned off screen.
           */
          vm.positionDatepicker = function($event) {
            
              // get md-input-container parent of the clicked button
              var pickerContainer = angular.element($event.target).parent().parent()

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
          

  }

}
