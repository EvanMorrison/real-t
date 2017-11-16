module.exports = function(app) {
  app.service('newCaseService', [
                                    '$http',
                                    '$stateParams',
                                    NewCaseService
  ])

  function NewCaseService($http, $stateParams) {


    this.createNewCase = caseRecord => {
      return $http.post('/api/case/new', caseRecord)
      .then(result => {
        this.caseRecord = result.data;
        return this.caseRecord;
      })
      .catch(err => Promise.reject(err))
    }


    this.addDataToCase = (caseRecord, profile, path) => {
      
    } 
    
  }  
  
}
