module.exports = function(app) {

    app.service('localAuthService', ['$http', '$state', 'tokenService', function ($http, $state, tokenService) {
            this.spinner = false;


            this.getUser = () => {
              return $http.get('/api/user/me')
                .then((res) => {
                  this.user = res.data;
                  this.user.name = res.data.name || res.data.email.slice(0,res.data.email.indexOf('@'));
                  console.log('acquired user profile ', this.user);
                  this.user.isSignedIn = true;
                  return this.user;
                })
                .catch((err) => {
                  console.log('error retreiving user profile ', err);
                  this.spinner = false
                  return null;
                })
            }


            this.signout = function() {
              tokenService.removeToken();
              $state.go('login');
            }

            this.signupWithEmailAndPassword = (submittedCredentials) => {
                this.spinner = true;
                return $http.post('auth/signup', submittedCredentials)
                .then((res) => {
                  this.spinner = false;
                  return res.data
                })
                .catch((err) => {
                  this.spinner = false;
                  console.log('error with signin ', err);
                  throw err
                })
            }

            this.signinWithEmailAndPassword = (submittedCredentials) => {
              this.spinner = true;
              return $http.post('auth/signin', submittedCredentials)
              .then((res) => {
                this.spinner = false;
                console.log('sign in successfull ', res)
                return res;
              })
              .catch((err) => {
                this.spinner = false;
                console.log('error with signin ', err);
                throw err
              })
            }
            
    }])

    app.service('tokenService', ['$cookies', function($cookies) {
        // store the token in a cookie
        this.setToken = function(token) {
            $cookies.put('token', token);
        }

        this.getToken = function() {
            return $cookies.get('token');
        }

        this.removeToken = function() {
            $cookies.remove('token');
        }
          
      
    }])

     // interceptor to add the user authentication token to all CRUD methods
     app.factory("AuthInterceptor", ["$q", "$state", "tokenService", function ($q, $state, tokenService) {
      return {
          request: function (config) {
              var token = tokenService.getToken();
              if (token) {
                  config.headers = config.headers || {};
                  config.headers.Authorization = "Bearer " + token;
              }
              return config;
          },
          responseError: function (response) {
              if (response.status === 401) {
                  tokenService.removeToken();
                  $state.go('login');
              }
              return $q.reject(response);
          }

      }
    }]);

    // add the AuthInterceptor to the httpProvider settings. 
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);

}
    