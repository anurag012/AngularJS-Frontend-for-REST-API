(function() {
    'use strict';

    angular.module('plunker')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['userService'];

    function UsersController(userService) {
        var mainVm = this;

        mainVm.addUser = addUser;
        mainVm.deleteUser = deleteUser;
        mainVm.updateUser = updateUser;
        mainVm.edit = edit;
        mainVm.changeSort = changeSort;
        mainVm.submit = submit;
        
        init();

        function init() {

            mainVm.sorter = {
                by: 'firstName',
                reverse: false
            };

            userService.getUsers()
                .then(function(users) {
                    mainVm.users = users;
                }, function(error) {
                    console.error(error);
                });
        }

        function changeSort (prop) {
            mainVm.sorter.by = prop;
            mainVm.sorter.reverse = !mainVm.sorter.reverse;
        }

        function addUser() {
            console.log(mainVm.newUser);
            userService.createUser(mainVm.newUser).then(function(users) {
                mainVm.users.push(users);
            }, function(error) {
                console.error(error);
            });
        }
        
        function deleteUser(id) {
            console.log("Got delete request for:",id);
            userService.deleteUser(id).then(function (id) {
                mainVm.users.splice(id,1);
            }, function (error) {
                console.log(error);
            });
        }
        
        function updateUser() {
           console.log("Got HERE:",mainVm.newUser, mainVm.newUser.id);
            userService.updateUser(mainVm.newUser, mainVm.newUser.id).then(function() {
                mainVm.users = mainVm.users;
            }, function(error) {
                console.error(error);
            });
        }
        
        function submit() {
            if(mainVm.newUser.id == null){
                mainVm.addUser();
            } else{
                mainVm.updateUser();
            }
            
        }
        
        function edit(id) {
            for(var i=0; i<mainVm.users.length;i++){
                if(mainVm.users[i].id === id){
                    mainVm.newUser = angular.copy(mainVm.users[i]);
                    break;
                }

            }
        }


    }

})();