

module.exports = function(ngModule) {

  ngModule
    .service('caseService', [
                                '$http',
                                '$stateParams', 
                                'listViewService',
                                CaseService
                            ])

    function CaseService($http, $stateParams, listViewService) {
      
      this.caseList = []; //listViewService.caseList;
      this.isListCurrent = false;
      this.statesList = require('./constants').STATES;
    /**
     * List-View Service, retrieves a 'light' list of all cases with select fields populated
     * for the caseList view.
     */
    this.loadCaseList = () => {
        if (!this.isListCurrent) {
          this.waiting = true;
          return $http.get('/api/cases/lightlist')
          .then(result => {
            this.waiting = false;
            this.isListCurrent = true;
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
      this.createNewCase = (caseData) => {
        this.waiting = true;
        return $http.post('/api/cases', caseData)
        .then(result => {
            this.waiting = false;
            this.caseRecord = result.data;
            this.isListCurrent = false;
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            return Promise.reject(err);
        }) 
    }


    this.updateCaseSection = (caseid, profile, section) => {
        return $http.put('/api/cases/' + caseid + '/' + section, profile)
        .then(result => {
            let i = this.caseList.findIndex(item => item._id === caseid);
            if (i >= 0) this.caseList[i] = result.data;
            else this.isListCurrent = false;
            return result.data // returns updated case with section populated
        })  
        .catch(err => Promise.reject(err));
    }
    
    // update or create new person, property, or documents profile
    this.updatePersonPropertyOrDocuments = (profile, path, section) => {
        this.isListCurrent = false; // sets this.caseList to not current
        if (profile._id === 'new') {
            delete profile._id;
            let url = '/api/' + path;
            if (/Attorney/.test(section)) url += '/' + 'attorney';
            if (/otherParties/.test(section)) url += '/' + 'otherparty';
            return $http.post(url, profile)
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
        this.isListCurrent = false;
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

    // eg. get names of all organizations and trusts and all individuals
    this.getLookupList = (path, key, filter) => {
        if (path === 'people') path = 'people/names/principals';
        else if (path === 'properties') path = 'properties/parcelids';
        else if (path === 'cases') path = 'cases/casenum/list'
        if (filter) path += '?type=' + filter;
        return $http.get('/api/' + path)
        .then(result => {
            this.data = result.data;
          if (key === 'name') {  // for names, need to reorganize the data to be returned
            this.data = result.data.reduce((acc, item) => {
                let arr = [];
                if (item.shortName) arr.push({_id: item._id, name: `${item.shortName} ${item.lastName}`})
                if (item.fullName) arr.push({_id: item._id, name: item.fullName})
                if (item.fullOrgName) arr.push({_id: item._id, name: item.fullOrgName});
                return acc.concat(arr);
            },[]).sort((a,b) => a.name > b.name);
          }
          else if (key === 'county') {
              this.data = result.data.map(item => {
                  return ({ county: item._id, taxIds: item.prop})
              })
          } else if (key === 'caseNum') {
              this.data = result.data.sort((a,b) => {
                if (a.caseNum.slice(0,2) === b.caseNum.slice(0,2)) return b.caseNum.slice(3) - a.caseNum.slice(3);
                else return b.caseNum - a.caseNum;
                });
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
