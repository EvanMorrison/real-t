export default function(app) {
  app.service("listViewService", [ 
    '$http',
    '$stateParams',
    ListViewService
  ])

  function ListViewService($http, $stateParams) {
    const self = this;
    this.caseList = [];

    this.loadCaseList = () => {
      if (!this.caseList.length) {
        this.waiting = true;
        return $http.get('/api/cases/lightlist')
        .then(result => {
          this.waiting = false;
          this.caseList = result.data;
          return this.caseList;
        })
        .catch(err => {
          this.waiting = false;
          console.log('error retrieving case list: ', err);
          return this.caseList;
        })
      }
      else return this.caseList;
    }
      

    
  }
  
}
