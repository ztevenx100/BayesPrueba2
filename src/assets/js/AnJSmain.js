/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var myApp = angular.module("myApp", []);

(function (app) {
    "use strict";
    app.controller("ImgController", function ($scope) {        
        
        $scope.fGalery = false;
        $scope.fUp = false;
        
        $scope.Save = function () {
            $scope.fGalery = false;
            $scope.fUp = false;
        };

        $scope.ShowForm = function (formName,formValue) {
            if (!formValue && formName === 'fGalery') {
                $scope.fGalery = true;
                $scope.fUp = false;
                console.log("entro", $scope.fGalery,"+",$scope.fUp);
            } 
            
            if (!formValue && formName === 'fUp') {
                $scope. fUp= true;
                $scope.fGalery = false;
                console.log("entro", $scope.fGalery,"+",$scope.fUp);
            } 
           
        };
        
    });
})(myApp);

