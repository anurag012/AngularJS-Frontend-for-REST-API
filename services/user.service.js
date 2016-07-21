(function() {
    'use strict';

    angular.module('plunker')
        .service('userService', userService);

    userService.$inject = ['$http', '$q'];

    function userService($http, $q) {

        var self = this;

        self.getUsers = getUsers;
        self.getUserByEmail = getUserByEmail;
        self.createUser = createUser;
        self.updateUser = updateUser;
        self.deleteUser = deleteUser;

        function getUsers() {
            return $http.get('http://localhost:8080/spring-rest/api/users/')
                .then(successFn, errorFn);
        }

        function getUserByEmail(email) {
            return $http.get('http://localhost:8080/spring-rest/api/users/' + email)
                .then(successFn, errorFn);
        }

        function createUser(user) {
            console.log("User Service:",user);
            return $http.post('http://localhost:8080/spring-rest/api/users/',user)
                .then(successFn,errorFn);
        }

        function updateUser(user,id) {
            return $http.put('http://localhost:8080/spring-rest/api/users/'+id,user)
                .then(successFn,errorFn);
        }

        function deleteUser(id) {
            return $http.delete('http://localhost:8080/spring-rest/api/users/'+id)
                .then(successFn,errorFn);
        }

        function successFn(response) {
            return response.data;
        }

        function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }
    }

})();