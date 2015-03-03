// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SimpleRESTIonic', ['ionic', 'angular-storage', 'weblogng', 'backand', 'ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.constant('weblogngConfig', {
    apiKey: 'd156e786-9cb4-4737-99ad-fdb905340275',
    options: {
      publishNavigationTimingMetrics: true,
      publishUserActive: true,
      application: 'simple-rest-website'
    }
  })
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        views: {
            dashboard: {
                templateUrl: 'dashboard.html',
                controller: 'DashboardCtrl as dashboard'
            }
        }
    })
    .state('login', {
        url: '/login',
        views: {
            login: {
                templateUrl: 'login.html',
                controller: 'LoginCtrl as login'
            }
        }
    });

    $urlRouterProvider.otherwise('/dashboard');

    $httpProvider.interceptors.push('APIInterceptor');
})
.service('APIInterceptor', function($rootScope, $cookieStore) {
    var service = this;

    service.request = function(config) {
        config.headers['Authorization'] = $cookieStore.get('backand_token');
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})
.service('ItemsModel', function ($http, Backand) {
    var service = this,
        tableUrl = '/1/table/data/',
        path = 'items/';

    function getUrl() {
        return Backand.configuration.apiUrl + tableUrl + path;
    }

    function getUrlForId(itemId) {
        return getUrl(path) + itemId;
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

    service.destroy = function (itemId) {
        return $http.delete(getUrlForId(itemId));
    };
})
.service('LoginService', function(Backand) {
    var service = this;

    service.signin = function(email, password, appName) {
        return Backand.signin(email, password, appName)
    };

    service.signout = function() {
        Backand.signout();
    };
})
.controller('LoginCtrl', function(Backand, $state, $rootScope, $cookieStore, LoginService){
    var login = this;

    function signin() {
        LoginService.signin(login.email, login.password, login.appName)
            .then(function(response) {
                $cookieStore.put(Backand.configuration.tokenName, response);
                $rootScope.$broadcast('authorized');
                $state.go('dashboard');
            }, function(error) {
                console.log(error)
            })
    }

    login.signin = signin;
})
.run(function($rootScope, $state, LoginService, $cookieStore) {

    function unauthorized() {
        console.log("user is unauthorized, sending to login");
        $state.go('login');
    }
    function signout() {
        LoginService.signout();
    }

    $rootScope.$on('unauthorized', function() {
        unauthorized();
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name == 'login') {
            signout();
        }
        else if (toState.name != 'login' && $cookieStore.get('backand_token') === undefined) {
            unauthorized();
        }
    });
})
.controller('DashboardCtrl', function(ItemsModel, $rootScope){
    var dashboard = this;

    function getItems() {
        ItemsModel.all()
            .then(function (result) {
                dashboard.items = result.data.data;
            });
    }

    function createItem(item) {
        ItemsModel.create(item)
            .then(function (result) {
                cancelCreateItem();
                getItems();
            });
    }

    function updateItem(item) {
        ItemsModel.update(item.Id, item)
            .then(function (result) {
                cancelEditing();
                getItems();
            });
    }

    function deleteItem(itemId) {
        ItemsModel.destroy(itemId)
            .then(function (result) {
                cancelEditing();
                getItems();
            });
    }

    function initCreateForm() {
        dashboard.newItem = { name: '', description: '' };
    }

    function setEditedItem(item) {
        dashboard.editedItem = angular.copy(item);
        dashboard.isEditing = true;
    }

    function isCurrentItem(itemId) {
        return dashboard.editedItem !== null && dashboard.editedItem.Id === itemId;
    }

    function cancelEditing() {
        dashboard.editedItem = null;
        dashboard.isEditing = false;
    }

    function cancelCreateItem() {
        initCreateForm();
        dashboard.isCreating = false;
    }

    dashboard.items = [];
    dashboard.editedItem = null;
    dashboard.isEditing = false;
    dashboard.isCreating = false;
    dashboard.getItems = getItems;
    dashboard.createItem = createItem;
    dashboard.updateItem = updateItem;
    dashboard.deleteItem = deleteItem;
    dashboard.setEditedItem = setEditedItem;
    dashboard.isCurrentItem = isCurrentItem;
    dashboard.cancelEditing = cancelEditing;
    dashboard.cancelCreateItem = cancelCreateItem;

    $rootScope.$on('authorized', function() {
        getItems();
    });

    initCreateForm();
    getItems();

    })
;
