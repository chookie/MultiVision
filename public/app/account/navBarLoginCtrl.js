(function (angular) {

    var app = angular.module('app');

    var navBarLoginCtrl = function($scope, mvIdentity, mvNotifier, mvAuth, $location) {
        $scope.identity = mvIdentity;
        $scope.signin = function (username, password) {
            mvAuth.authenticateUser(username, password).then( function (success) {
                if(success){
                    mvNotifier.notifySuccess("You have successfully signed in!");
                } else {
                    mvNotifier.notifyFail("Username/Password combination incorrect")
                }
            });
        };
        $scope.signout = function() {
            mvAuth.logoutUser().then( function() {
                // Reset username and password text boxes on form
                $scope.username = "";
                $scope.password = "";
                mvNotifier.notifySuccess("You have successfully signed out!");
                // Redirect to home
                $location.path('/');
            });
        }
    };

    app.controller("navBarLoginCtrl", ["$scope","mvIdentity","mvNotifier", "mvAuth", "$location", navBarLoginCtrl]);

}(window.angular));