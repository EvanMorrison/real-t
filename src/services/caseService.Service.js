
module.exports = function(ngModule) {

  ngModule
    .service('caseService', [
                                '$firebaseArray', 
                                '$firebaseObject', 
                                '$firebaseRef', 
                                '$stateParams', 
                                CaseService
                            ])


    function CaseService($firebaseArray, $firebaseObject, $firebaseRef, $stateParams) {
      const self = this;

      this.getFullCase = (searchId) => {
            
          return $firebaseObject($firebaseRef.cases.child(searchId));
      }

      this.LoadAllCases = () => {
            self.waiting = true;
            return $firebaseArray($firebaseRef.cases)
                .$loaded(function(res) {
                    self.waiting = false;
                    self.CaseList = res;
                    return self.CaseList;
                }, function(err) {
                    self.waiting = false;
                    return err;
                })

      }
      
    }

}
