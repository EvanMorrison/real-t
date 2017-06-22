(function() {

  angular.module('CaseMain', [])
  .component('caseMain', {
    templateUrl: 'components/caseMain/caseMain.template.html',
    controller: [CaseMainController],
    controllerAs: 'ctrl',
    bindings: { 'case': '<'}
  });

    function CaseMainController() {
      const ctrl = this;
      ctrl.Counties = ["Box Elder", "Davis", "Salt Lake", "Summit", "Uintah", "Wasatch", "Washington", "Weber"]

      ctrl.property = {
        address: "13700 N Fountain Hills Boulevard, Apt 202 \nSyracuse, UT 84014",
        county: "Davis",
        taxId: "36-238-9984",
        owner: "Stuart McFarlain",
        legalDescription: "Lot 75, VISTA BONITA HEIGHTS SUBDIVISION, according to the official plat thereof on file and of record in the Office of the Recorder for Davis County, Utah."
      }
       
      ctrl.lender = {
        name: "Peter Boghashian",
        address: "50 S Main Street\nSalt Lake City, UT 84111",
        phone: "801-412-8382",
        email: "pboghashian@email.net"
      }

      ctrl.borrower = {
        name: "Jamie Lannister",
        address: "301 South 200 East, Ste 150\nSalt Lake City, UT 84111",
        phone: "801-558-0192",
        email: ""
      }

      ctrl.loan = {
        amount: "$257,842",
        DOT: {
                recorded: "April 3, 2015",
                entry: "158293045",
                origBeneficiary: "Oscar Travers",
                origTrustee: "First American Title Insurance Company",
                nonBorrowerTrustors: ""
        },
        assignments:[ 
              {
                recorded: "05/12/2017",
                entry: "172389298",
                assignee: "Peter Boghasian"
              }
        ],
        substitutions: [
              {
                recorded: "",
                entry: "",
                newTrustee: ""
              }
        ]
      }

    }


})();
