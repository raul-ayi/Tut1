/**************************************************
+	Module:		ionicApp
**************************************************/

angular.module('ionicApp', ['ionic','ionicApp.Main','ionicApp.UserList', 'ionicApp.Page3'])

.config(function($urlRouterProvider) {
  // Default route for the whole app
  $urlRouterProvider.otherwise('/main');
});


/**************************************************
+	Module:		ionicApp.Main
+	Exports:
+		MainCtrl
**************************************************/

angular.module('ionicApp.Main', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
  });
})

.controller("MainCtrl", function() {
  console.log("Main Controller says: Hello World");
});


/**************************************************
+	Module:		ionicApp.UserList
+	Exports:
+		userService
+		Page2Ctrl
**************************************************/

angular.module('ionicApp.UserList', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('UserList', {
    url: '/UserList',
    templateUrl: 'templates/UserList.html',
    controller: 'UserListCtrl'
        })
        .state('UserListDetail', {
          url: '/UserListDetail/:index',
          templateUrl: 'templates/UserListDetail.html',
          controller: "UserListDetailCtrl"
        })

})

.factory('userService', function($http) {
  var users = [];

  return {
    getUsers: function() {
      return $http.get('http://randomuser.me/api/?results=10').then (function(response) {
        users = response.data.results; // populate the variable
        return response.data.results;
      });
    },
    getUser: function(index) {
      return users[index];
    }
  }
})

.controller("UserListCtrl", function($scope, userService) {
  userService.getUsers().then(function(users){
    $scope.users = users;
  })
})

.controller("UserListDetailCtrl", function($scope, $stateParams, userService) {
  var index = $stateParams.index;
  $scope.item = userService.getUser(index);
});


/**************************************************
+	Module:		ionicApp.Page3
+	Exports:
+		Page3Ctrl
**************************************************/

angular.module('ionicApp.Page3', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('page3', {
    url: '/page3',
    templateUrl: 'templates/page3.html',
    controller: 'Page3Ctrl'
  });
})

.controller("Page3Ctrl", function() {
  console.log("Main Controller says: Hello World from Page 3 Controller");
});
