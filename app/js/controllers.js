'use strict';

/* Controllers */
var taskListControllers = angular.module('taskListControllers', []);

taskListControllers.controller('TaskListCtrl', function TaskListCtrl($scope, $routeParams, $filter, $location, storage, Slug) {
    'use strict';

    var LIST_STORAGE_ID = 'lists';
    storage.bind($scope, LIST_STORAGE_ID);

    var defaultList = {
      listId: Slug.slugify('Work tasks' + '-' + 0),
      title: 'Work tasks',
      tasks: [
        { title: 'Star Wars marathon', completed: false },
        { title: 'Basejump off cliff', completed: false },
        { title: 'Ride a bronco', completed: true },
        { title: 'Eat Beluga caviar', completed: false },
        { title: 'Climb Mt. Everest', completed: false },
        { title: 'Own a Bentley', completed: false },
        { title: 'Learn Tae-Kwon-Do', completed: false },
        { title: 'Create a successful startup', completed: false }
      ]};

    $scope.newTask = '';
    $scope.newList = '';

    var lists = $scope.lists = storage.get(LIST_STORAGE_ID) || [defaultList]

    $scope.currentList = lists[0] || { tasks: [] };
    var tasks = $scope.tasks = $scope.currentList.tasks;

    $scope.$watch('tasks', function (newValue, oldValue) {
      $scope.currentList.remainingCount = $filter('filter')(tasks, { completed: false}).length
      $scope.currentList.completedCount = tasks.length - $scope.currentList.remainingCount
    }, true);

    // Update the location url whenever current list changes
    $scope.$watch('currentList', function (newValue, oldValue) {
      if (newValue.title !== oldValue.title) {
        $scope.setLocation();
      }
    }, true);

    // Monitor the current route for changes and adjust the filter accordingly.
    $scope.$on('$routeChangeSuccess', function () {
      if ($routeParams.listId) {
        var listId = $routeParams.listId.split("-").pop()
        var list = lists[listId];

        if (list !== undefined && list !== $scope.currentList) {
          $scope.currentList = list;
          $scope.setTasks();
        } else if (list !== $scope.currentList) {
          $location.path('/');
        }
      }
    });

    $scope.setLocation = function() {
      var url = '/'

      if ($scope.currentList) {
        url += $scope.currentList.listId;
      }

      $location.path(url);
    }

    $scope.setTasks = function() {
      tasks = $scope.tasks = $scope.currentList.tasks;
    }

    $scope.setCurrentList = function() {
      if (!$scope.currentList && !lists) {
        $scope.currentList = lists[0];
      }
    }

    $scope.addList = function() {
      var newList = $scope.newList.trim();

      if (!newList.length) {
        return;
      }

      lists.push({
        listId: Slug.slugify(newList + '-' + lists.length),
        title: newList,
        tasks: [],
        remainingCount: 0
      });

      $scope.newList = '';
      $scope.currentList = lists[lists.length - 1];
      $scope.setTasks();
    }

    $scope.removeList = function(list) {
      lists.splice(lists.indexOf(list), 1);
      $scope.currentList = lists[lists.length - 1];
      $scope.setTasks();
    }

    $scope.addTask = function() {
      var newTask = $scope.newTask.trim();

      if (!newTask.length) {
        return;
      }

      tasks.push({
        title: newTask,
        completed: false
      });

      $scope.newTask = '';
    };

    $scope.removeTask = function(task) {
      tasks.splice(tasks.indexOf(task), 1);
    }
  });
