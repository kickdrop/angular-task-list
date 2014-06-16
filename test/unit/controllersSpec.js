'use strict';

describe('taskListApp controllers', function() {

  beforeEach(module('taskListApp'));

  describe('TaskListCtrl', function() {
    var scope, ctrl;
    var storage = {
      storage: {},
      get: function () {
        return this.storage;
      },
      put: function (value) {
        this.storage = value;
      }
    };

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('TaskListCtrl', {$scope: scope})
    }));

    describe('Managing Lists', function() {

      it('should not have a new List on start', function () {
        expect(scope.newList).toBe('');
      });

      it('should have default List on start', function () {
        expect(scope.lists.length).toBe(1);
      });

      it('should not add empty Lists', function () {
        scope.newList = '';
        scope.addList();
        expect(scope.lists.length).toBe(1);
      });

      it ('should add a new valid List', function () {
        scope.newList = 'Hogor\'s Tasks';
        scope.addList();
        expect(scope.lists.length).toBe(2);
      });
    });

    describe('Managing Tasks', function() {
      it('should not have a new Task on start', function () {
        expect(scope.newTask).toBe('');
      });

      it('should have default Tasks on start', function () {
        expect(scope.tasks.length).toBe(8);
      });

      it('should not add empty Tasks', function () {
        scope.newTask = '';
        scope.addTask();
        expect(scope.tasks.length).toBe(8);
      });

      it ('should add a new valid Task', function () {
        scope.newTask = 'Finish';
        scope.addTask();
        expect(scope.tasks.length).toBe(9);
      });
    });
  });
});
