/**************************************************
+	Module:		ionicApp
**************************************************/

angular.module('ionicApp', ['ionic','ionicApp.Main','ionicApp.Page2'])

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
+	Module:		ionicApp.Page2
+	Exports:
+		userService
+		Page2Ctrl
**************************************************/

angular.module('ionicApp.Page2', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('page2', {
    url: '/page2',
    templateUrl: 'templates/page2.html',
    controller: 'Page2Ctrl'
  })
})

.factory('userService', function($http) {
  return {
    getUsers: function() {
      return $http.get('http://randomuser.me/api/?results=10').then (function(response) {
        return response.data.results;
      });
    }
  }
})

.controller("Page2Ctrl", function($scope, userService) {
  userService.getUsers().then(function(users){
    $scope.users = users;
  });
});
