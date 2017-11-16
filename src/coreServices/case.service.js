
module.exports = function(ngModule) {

  ngModule
    .service('caseService', [
                                '$http',
                                '$stateParams', 
                                'listViewService',
                                CaseService
                            ])

    function CaseService($http, $stateParams, listViewService) {
      
      this.caseList = listViewService.caseList;

    /**
     * List-View Service, retrieves a 'light' list of all cases with select fields populated
     * for the caseList view.
     */
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


    /**
     *
     * Case Detail Service, retrieve all data for a specific case  
     */
    this.getcaseDetail = caseRecord => {
        this.waiting = true;
        return $http.get('/api/cases/' + caseRecord._id)
        .then(result => {
            this.waiting = false;
            this.caseRecord = result.data;
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            console.log('error getting case detail: ', err);
            return Promise.reject(err);
        })
    }



    /**
     * Create, Update, Delete Services
     */

      // Create an new empty case record
      this.createNewCase = () => {
        this.waiting = true;
        this.newCase = {
          caseNum: null,
          lender: [],
          borrower: [],
          loan: {},
          property: {},
          documents: {},
          currentOwnerName: null,
          status: []
        }
        return $http.post('/api/cases')
        .then(result => {
            this.waiting = false;
            Object.assign(this.newCase, result.data);
            this.caseRecord = this.newCase;
            console.log('created new case ', this.caseRecord);
            if (this.caseList.length > 0) this.caseList.unshift(this.caseRecord);
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            console.log('error in service generating new case: ', err);
            return Promise.reject(err);
        }) 
    }

    // save new case, person, property, or document record
    this.saveNewRecord = (data, path) => {
      this.waiting = true;
          return $http.post('/api/' + path, data)
          .then(result => {
              this.waiting = false;
              this.caseRecord = result.data;
              return this.caseRecord
          })
          .catch(err => {
              this.waiting = false;
              console.log('service error in update record ', err);
              return Promise.reject(err);
          })
    }

    
    // Save updates to existing cases
    this.updateRecord = (data, path) => {
      this.waiting = true;
          return $http.put('/api/' + path + '/' + data._id, data)
          .then(result => {
              this.waiting = false;
              this.recordData = result.data;
              return this.recordData
          })
          .catch(err => {
              this.waiting = false;
              console.log('service error in update record ', err);
              return Promise.reject(err);
          })
    }

    // Delete a case
    this.deleteCase = (caseRecord) => {
      this.waiting = true;
      return $http.delete('/api/cases/' + caseRecord._id)
      .then(result => {
          this.waiting = false;
          this.caseList.splice(this.caseList.indexOf(caseRecord),1);
          return Promise.resolve(result.data.caseNum)
      })
      .catch(err => {
          this.waiting = false;
          console.log('error in service deleting case: ', err);
          return Promise.reject(err);
      })
    } 
    
    this.getPerson = (personId) => {
      this.waiting = true;
      return $http.get('/api/people/' + personId) 
      .then(result => {
        this.waiting = false;
        return result.data;
      })
      .catch(err => {
        this.waiting = false;
        return Promise.reject(err);
      })
    }



    /**
     * Retrieve lists of particular fields for queries of case data, used for autocomplete and 
     * searches of case data
     */

    // get names of all organizations and trusts and all individuals not associated with an
    // organization or trust
    this.getPrincipalPartyNames = () => {
        return $http.get('/api/people/names/principals')
        .then(result => {
          this.names = result.data.map(item => {
              item.name = item.fullOrgName || item.displayName;
              delete item.displayName;
              delete item.fullOrgName;
              return item;
          }).sort((a,b) => a.name > b.name);
          console.log('list of all names ', this.names);
          return this.names;
        })
        .catch(err => {
            console.log('service error in get all names')
            return Promise.reject(err)
          })
    }

      
  }

}
