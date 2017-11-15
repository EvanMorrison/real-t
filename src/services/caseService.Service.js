
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
      
      // Save updates to existing cases
      this.updateRecord = (data, category) => {
        self.waiting = true;
            return $http.put('/api/' + category + '/' + data._id, data)
            .then((result) => {
                self.waiting = false;
                self.recordData = result.data;
                return self.recordData
            })
            .catch(err => {
                console.log('service error in update record ', err);
                return Promise.reject(err);
            })
      }

      // Create a new case file
      this.generateNewCase = () => {
          self.waiting = true;
          self.newCase = {
            caseNum: '',
            lender: {},
            borrower: {},
            loan: {},
            property: {},
            documents: {},
            currentOwnerName: '',
            status: []
          }
          return $http.post('/api/case/new')
          .then((result) => {
              self.waiting = false;
              Object.assign(self.newCase, result.data);
              self.caseRecord = self.newCase;
              console.log('created new case ', self.caseRecord);
              if (self.CaseList.length > 0) self.CaseList.unshift(self.caseRecord);
              return self.caseRecord;
          })
          .catch(err => {
              self.waiting = false;
              console.log('error in service generating new case: ', err);
              return Promise.reject(err);
          }) 
      }
      
      this.getPerson = (personId) => {
        return $http.get('/api/person/' + personId) 
        .then(result => {
            return result.data;
        })
        .catch(err => {
            return Promise.reject(err);
        })
      }


      this.getAllNames = () => {
          return $http.get('/api/person/names')
          .then(result => {
            self.names = result.data.map(item => {
                item.name = item.fullOrgName || item.displayName;
                delete item.displayName;
                delete item.fullOrgName;
                return item;
            }).sort((a,b) => a.name > b.name);

            console.log('list of all names ', self.names);
            return self.names;
          })
          .catch(err => {
              console.log('service error in get all names')
              return Promise.reject(err)
            })
      }

      this.saveNewRecord = (data, category) => {
        category = category.toLowerCase();
        self.waiting = true;
            return $http.post('/api/' + category, data)
            .then((result) => {
                self.waiting = false;
                self.caseRecord = result.data;
                return self.caseRecord
            })
            .catch(err => {
                console.log('service error in update record ', err);
                return Promise.reject(err);
            })
      }

      // Delete a case
      this.deleteCase = (caseRecord) => {
        self.waiting = true;
        return $http.delete('/api/case/' + caseRecord._id)
        .then(result => {
            self.CaseList.splice(self.CaseList.indexOf(caseRecord),1);
            return Promise.resolve(result.data.caseNum)
        })
        .catch(err => {
            console.log('error in service deleting case: ', err);
            return Promise.reject(err);
        })
      }
    }

}
