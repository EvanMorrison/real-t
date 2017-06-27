(function() {

  

  angular.module('CaseMain', [])
    .config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  })

  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: ['caseService', '$state', CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'case': '<'}
  });

    function CaseMainController(caseService, $state) {
          const ctrl = this;
          
          ctrl.isCaseIdValid = true;

          ctrl.$onInit = function() {
              ctrl.isActiveEdit = false;
              console.log('case', ctrl.case)
          }

          // lookup case by caseId 
          ctrl.caseLookup = function($event) {
            $event.preventDefault();
            console.log('looking for ', ctrl.searchId)
            caseService.getFullCase(ctrl.searchId)
            .$loaded(function(data) {
                console.log('data ', data)
                console.log('val ', data.$value);
                if (data.$value === undefined) {
                    ctrl.isCaseIdValid = true;
                    ctrl.case = data;
                } else {
                    ctrl.isCaseIdValid = false;
                }
            })
            
            
            
          }

          // save edits to case info
          ctrl.saveChanges = function() {
              // convert dates to strings for JSON format in database
              ctrl.case.loan.DOT.recorded = ctrl.case.loan.DOT.recorded.toString()
              angular.forEach(ctrl.case.loan.assignments, function(val, key) {
                if (val['recorded']) { 
                  val['recorded'] = val['recorded'].toString()
                }
              })
            
              ctrl.case.$save().then(function(ref) {
                ctrl.isActiveEdit = !ctrl.isActiveEdit;
              })
          }

          // cancel edits restore original data
          ctrl.cancelChanges = function() {
            ctrl.case = caseService.getFullCase(ctrl.searchId);
            ctrl.isActiveEdit = !ctrl.isActiveEdit;
          }


          // county selection input options
          ctrl.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]
          
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
          
          
          
    }


})();
