// Module 
var todoList = angular.module("todoList",[]);

// Controller
todoList.controller("todoListCtrl", function($scope){
	
    localStorage['state'] ? $scope.tasksList = JSON.parse(localStorage['state']) : $scope.tasksList = model;

    $scope.setListState = function() {
    	localStorage['state'] = angular.toJson($scope.tasksList);
    }
    $scope.AddTask = function(e) {
    	e.preventDefault();
    	$scope.completion = $scope.complete ? true : false;
        $scope.tasksList.push(new Task($scope.name, $scope.descr, $scope.date, $scope.completion));
        $scope.setListState();
    }
});