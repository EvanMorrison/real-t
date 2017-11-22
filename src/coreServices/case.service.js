

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
        return $http.post('/api/cases')
        .then(result => {
            this.waiting = false;
            this.caseRecord = result.data;
            if (listViewService.caseList.length) listViewService.caseList.unshift(this.caseRecord);
            console.log('created new case ', this.caseRecord);
            return this.caseRecord;
        })
        .catch(err => {
            this.waiting = false;
            console.log('error in service generating new case: ', err);
            return Promise.reject(err);
        }) 
    }

    // save new person
    this.saveNewPersonOrProperty = (data, path) => {
          return $http.post('/api/' + path, data)
          .then(result => result.data)
          .catch(err => Promise.reject(err));
    }

    this.saveProfileToCase = (data, path, section) => {
        // this.waiting = true;
        if (path === 'people' || path === 'properties') {
            if (!data._id) {
                return this.saveNewPersonorProperty(data, path)
                .then(result => {
                    data = result._id;
                    this.updateCasePeopleOrProperty(data, path, section)
                    .then(result => result)
                })
                .catch(err => Promise.reject(err));

            } else {
                return this.updateCasePeopleOrProperty(data, path, section)
                .then(result => result)
                .catch(err => Promise.reject(err));
            }
        } else {
            return this.updateCase(data,section)
            .then(result => result)
            .catch(err => Promise.reject(err))
        }
    }
        
        this.updateCasePeopleOrProperty = (data, path, section) => {
            let url = '/api/cases/' + this.caseRecord._id;
            url += '/' + path;
            url += path === 'people' ? '/' + section : '';
            return $http.put(url, data)
            .then(result => {
                this.caseRecord = result.data;
                return this.caseRecord;
            })
            .catch(err => Promise.reject(err));
        }

		this.updateCase = (data, section) => {
			return $http.put('/api/cases/' + this.caseRecord._id, {[section]: data})
			.then(result => {
                this.caseRecord = result.data;
                return this.caseRecord;
            })
			.catch(err => Promise.reject(err));
		}
    
    // Save updates to existing cases
    this.updateRecord = (data, path) => {
        console.log('in updaterecord ', 'path: ', path, 'data: ', data)
      this.waiting = true;
          return $http.put('/api/' + path + '/' + data._id, data)
          .then(result => {
              this.waiting = false;
              console.log('results of updaterecord ', result);
              return result.data;
          })
          .catch(err => {
              this.waiting = false;
              console.log('service error in update record ', err);
              return Promise.reject(err);
          })
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
          console.log('error in service deleting case: ', err);
          return Promise.reject(err);
      })
    } 
    
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
            else if (key === 'parcelTaxId') path = 'properties/parcelids';
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
          return this.data;
        })
        .catch(err => {
            console.log('service error in get all names')
            return Promise.reject(err)
          })
    }

      
  }

}
