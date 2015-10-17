angular.module('SimpleRESTIonic.controllers', [])

.controller('LoginCtrl', function(Backand, $state, $rootScope, LoginService){
  var login = this;

  function signin() {
    LoginService.signin(login.email, login.password, login.appName)
        .then(function() {
          $rootScope.$broadcast('authorized');
          $state.go('tab.dashboard');
        }, function(error) {
          console.log(error)
        })
  }

  function signout(){
    LoginService.signout()
        .then(function() {
          $state.go('tab.login');
        })

  }

  login.signin = signin;
  login.signout = signout;
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
    ItemsModel.update(item.id, item)
        .then(function (result) {
          cancelEditing();
          getItems();
        });
  }

  function deleteItem(itemId) {
    ItemsModel.delete(itemId)
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
    return dashboard.editedItem !== null && dashboard.editedItem.id === itemId;
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

});

