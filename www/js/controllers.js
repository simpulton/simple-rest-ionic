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
  var vm = this;

  function getAll() {
    ItemsModel.all()
        .then(function (result) {
          vm.data = result.data.data;
        });
  }

  function create(object) {
    ItemsModel.create(object)
        .then(function (result) {
          cancelCreate();
          getAll();
        });
  }

  function update(object) {
    ItemsModel.update(object.id, object)
        .then(function (result) {
          cancelEditing();
          getAll();
        });
  }

  function deleteObject(id) {
    ItemsModel.delete(id)
        .then(function (result) {
          cancelEditing();
          getAll();
        });
  }

  function initCreateForm() {
    vm.newObject = { name: '', description: '' };
  }

  function setEdited(object) {
    vm.edited = angular.copy(object);
    vm.isEditing = true;
  }

  function isCurrent(id) {
    return vm.edited !== null && vm.edited.id === id;
  }

  function cancelEditing() {
    vm.edited = null;
    vm.isEditing = false;
  }

  function cancelCreate() {
    initCreateForm();
    vm.isCreating = false;
  }

  vm.objects = [];
  vm.edited = null;
  vm.isEditing = false;
  vm.isCreating = false;
  vm.getAll = getAll;
  vm.create = create;
  vm.update = update;
  vm.delete = deleteObject;
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;

  $rootScope.$on('authorized', function() {
    getAll();
  });

  initCreateForm();
      getAll();

});

