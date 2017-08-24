
module.exports = function(ngModule) {

  ngModule
    .service('caseService', [
                                // '$firebaseArray', 
                                // '$firebaseObject', 
                                // '$firebaseRef', 
                                '$http',
                                '$stateParams', 
                                CaseService
                            ])


    function CaseService($http, $stateParams) {
      const self = this;
      self.CaseList = [];

      self.getFullCase = function(searchId) {
          return $firebaseObject($firebaseRef.cases.child(searchId));
      }

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
    //   this.LoadAllCases = () => {
    //         self.waiting = true;
    //         return $firebaseArray($firebaseRef.cases)
    //             .$loaded(function(res) {
    //                 self.waiting = false;
    //                 self.CaseList = res;
    //                 return self.CaseList;
    //             }, function(err) {
    //                 self.waiting = false;
    //                 return err;
    //             })

    //   }
      
    }

}
