var app = angular.module("bankApp", []);

app.controller("balancesController", ['$scope', '$http', function ($scope, $http) {
    $scope.users = [];

    $scope.loadUsers = function() {
        $http.get('http://localhost:3000/api/users').then(function(response) {
            $scope.users = response.data;
        });
    };

    $scope.loadUsers();

    $scope.current = {};
    
    $scope.addNew = function(current) {
        $http.post('http://localhost:3000/api/users', current).then(function(response) {
            $scope.users.push(response.data);
            $scope.current = {};
        });
    };

    $scope.remove = function(user) {
        $http.delete(`http://localhost:3000/api/users/${user.id}`).then(function() {
            var index = $scope.users.indexOf(user);
            $scope.users.splice(index, 1);
        });
    };

    $scope.edit = function(user) {
        $scope.current = angular.copy(user);
    };

    $scope.save = function() {
        $http.put(`http://localhost:3000/api/users/${$scope.current.id}`, $scope.current).then(function(response) {
            var index = $scope.users.findIndex(user => user.id === $scope.current.id);
            $scope.users[index] = response.data;
            $scope.current = {name: '', balance: 0};
        });
    };
}]);
