# AngularJS-Frontend-for-REST-API

This project creates a frontend using angularJs to perform CRUD operatrions on REST API backend.
Files for this project are as follows:

### app.js

    angular
        .module('plunker',[]);

It simply initializes angular module.

### user.service.js

This file works as a connection between frontend and backend. Services are responsible for passing the request URL to server and getting the result.
I initialized service as: 

    angular.module('plunker')
       .service('userService', userService);

I implemented promises to run function asynchronously.

    userService.$inject = ['$http', '$q'];

There are functions to perform the appropriate incoming requests and send them to server. One for GET request is as follows:

    function getUsers() {
            return $http.get('http://localhost:8080/spring-rest/api/users/')
                .then(successFn, errorFn);
        }

    function successFn(response) {
            return response.data;
        }

    function errorFn(response) {
            return $q.reject('ERROR: ' + response.statusText);
        }

### user.controller.js

Controllers are the most important part of any frontend or backend app. 

     angular.module('plunker')
        .controller('UsersController', UsersController);
        
Injected the userServices into controller so that controller can call proper function for each request.
Function to get users is:

    function getUsers(){
     userService.getUsers()
                .then(function(users) {
                    mainVm.users = users;
                }, function(error) {
                    console.error(error);
                });
    }
Here mainVm is nothing but the alias of "this" keyword. 

### index.html

This is the html file which will be displayed in web browser.
We intialized the html file as angular app.
    <html ng-app="plunker">
We created a form to send post requests. We used ng-model directive to bind the data.

    <input type="text" class="form-control" name="firstName" id="firstName" ng-model="mainVm.newUser.firstName" placeholder="Your First Name" required minlength="3">
    
We used ng-repeat directive to get all data from database.

    <tr ng-repeat="user in mainVm.users >
        <td>{{user.firstName}} {{user.lastName}}</td>
        <td>{{user.email}} </td>
        <td>{{user.city}}</td>
        <td>{{user.state}}</td>
        
I have also added functions to update and delete records. Also, the filter to search some particular users by email.

The complete code is available.

Thank you
Anurag Garg
