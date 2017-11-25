

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
      this.statesList = require('./constants').STATES;
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
            return Promise.reject(this.caseList);
          })
        }
        else return this.caseList;
    }


    /**
     *
     * Case Detail Service, retrieve all data for a specific case  
     */
    this.getCaseRecord = case_id => {
        this.waiting = true;
        return $http.get('/api/cases/' + case_id)
        .then(result => {
            this.waiting = false;
            this.caseRecord = result.data;
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            return Promise.reject(err);
        })
    }

    this.getCaseRecordByCaseNum = caseNum => {
        this.waiting = true;
        return $http.get('/api/cases/casenum/' + caseNum)
        .then(result => {
            this.waiting = false;
            if (!result.data) return Promise.reject('no result found')
            else {
                this.caseRecord = result.data;
                return this.caseRecord;
            }
        })
        .catch(err => {
            this.waiting = false;
            return Promise.reject(err);
        })
    }

    /**
     * Create, Update, Delete Services
     */

      // Create an new empty case record
      this.createNewCase = () => {
        this.waiting = true;
        return $http.post('/api/cases')
        .then(result => {
            this.waiting = false;
            this.caseRecord = result.data;
            if (listViewService.caseList.length) listViewService.caseList.unshift(this.caseRecord);
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            return Promise.reject(err);
        }) 
    }


    this.updateCaseSection = (caseid, profile, section) => {
        return $http.put('/api/cases/' + caseid + '/' + section, profile)
        .then(result => result.data)  // returns updated case with 'section' populated
        .catch(err => Promise.reject(err));
    }
    
    // save new person
    this.updatePersonPropertyOrDocuments = (profile, path) => {
        console.log('path: ', path, ' profile ', profile);
        if (profile._id === 'new') {
            delete profile._id;
            return $http.post('/api/' + path, profile)
            .then(result => result.data)
            .catch(err => Promise.reject(err))
        } else {
            return $http.put('/api/' + path + '/' + profile._id, profile)
            .then(result => result.data)
            .catch(err => Promise.reject(err));
        }
    }

    
  
    // remove a person or property profile from a case (does not delete the person or property profile from its collection)
    this.removeProfileFromCase = (profile, section) => {
        return $http.delete('/api/cases/' + this.caseRecord._id + '/' + section + '/' + profile._id)
        .then(result => {
            this.caseRecord = result.data;
            return this.caseRecord;
        })
        .catch(err => Promise.reject(err));
    }
   
   

    // Delete a case
    this.deleteCase = (caseRecord) => {
      if (!caseRecord || !caseRecord._id) return Promise.reject('cannot delete undefined case or case._id')
      this.waiting = true;
      return $http.delete('/api/cases/' + caseRecord._id)
      .then(result => {
            this.waiting = false;
            for (let i = 0; i < this.caseList.length; i++) {
                if (this.caseList[i]._id === result.data._id) {
                    this.caseList.splice(i,1)
                    break;
                }
            }
          return Promise.resolve(this.caseList);
      })
      .catch(err => {
          this.waiting = false;
          return Promise.reject(err);
      })
    } 
    




    // retrieve a specific person or property profile
    this.getProfile = (profileId, path) => {
      this.waiting = true;
      return $http.get('/api/' + path + '/' + profileId) 
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
    this.getLookupList = (path, key, filter) => {
        if (path === 'people') path = 'people/names/principals';
        else if (path === 'properties') {
            if (key === 'county') path = 'properties/counties';
            else if (key === 'taxId') path = 'properties/parcelids';
        } else if (path === 'documents') {
            if (key === 'county') path = 'documents/counties';
            else if (key === 'entryNo') path = 'documents/entrynos'
        }
        if (filter) path += '?type=' + filter;
        return $http.get('/api/' + path)
        .then(result => {
            this.data = result.data;
          if (key === 'name') {  // for names, need to reorganize the data to be returned
            this.data = result.data.reduce((acc, item) => {
                let arr = [];
                if (item.displayName) arr.push({_id: item._id, name: item.displayName})
                if (item.fullOrgName) arr.push({_id: item._id, name: item.fullOrgName});
                return acc.concat(arr);
            },[]).sort((a,b) => a.name > b.name);
          }
          else if (key === 'county') {
              this.data = result.data.map(item => {
                  return ({ county: item._id, taxIds: item.prop})
              })
          }
          return this.data;
        })
        .catch(err => {
            console.log('service error in get all names')
            return Promise.reject(err)
          })
    }

      
  }

}
