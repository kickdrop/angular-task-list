'use strict';

var taskListApp = angular.module('taskListApp', [
  'ngRoute',
  'taskListControllers',
  'angularLocalStorage',
  'slugifier'
]);

taskListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/task-list.html',
        controller: 'TaskListCtrl'
      }).
      when('/:listId', {
        templateUrl: 'partials/task-list.html',
        controller: 'TaskListCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
