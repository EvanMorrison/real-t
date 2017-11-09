
module.exports = function(ngModule) {

  ngModule
    .service('caseService', [
                                '$http',
                                '$stateParams', 
                                CaseService
                            ])


    function CaseService($http, $stateParams) {
      const self = this;
      self.CaseList = [];


      this.LoadAllCases = () => {
        if (!(self.CaseList.length > 0)) {    
        self.waiting = true;
            return $http.get('/api/case/fulllist')
            .then((result) => {
                self.waiting = false;
                self.CaseList = result.data;
                return self.CaseList
            })
            .catch((err) => {
                console.log('service error in get fulllist ', err);
                return err;
            })
        } else return self.CaseList;
      }
      
      this.updateRecord = (data, category) => {
          category = category.toLowerCase();
        self.waiting = true;
            return $http.put('/api/' + category + '/' + data._id, data)
            .then((result) => {
                self.waiting = false;
                self.updatedRecord = result.data;
                return self.updatedRecord
            })
            .catch(err => {
                console.log('service error in update record ', err);
                return err;
            })
      }
      
    }

}
