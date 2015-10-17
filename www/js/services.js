angular.module('SimpleRESTIonic.services', [])

.service('APIInterceptor', function($rootScope, $q) {
  var service = this;

  service.responseError = function(response) {
    if (response.status === 401) {
      $rootScope.$broadcast('unauthorized');
    }
    return $q.reject(response);
  };
})

.service('ItemsModel', function ($http, Backand) {
  var service = this,
      baseUrl = '/1/objects/',
      object = 'items/';

  function getUrl() {
    return Backand.getApiUrl() + baseUrl + object;
  }

  function getUrlForId(itemId) {
    return getUrl() + itemId;
  }

  service.all = function () {
    return $http.get(getUrl());
  };

  service.fetch = function (itemId) {
    return $http.get(getUrlForId(itemId));
  };

  service.create = function (item) {
    return $http.post(getUrl(), item);
  };

  service.update = function (itemId, item) {
    return $http.put(getUrlForId(itemId), item);
  };

  service.delete = function (itemId) {
    return $http.delete(getUrlForId(itemId));
  };
})

.service('LoginService', function(Backand) {
  var service = this;

  service.signin = function(email, password, appName) {

    //set the app name of Backand. In your app copy this to .config section with hard coded app name
    Backand.setAppName(appName);

    //call Backand for sign in
    return Backand.signin(email, password);
  };

  service.signout = function() {
    return Backand.signout();
  };
});
