var app = angular.module("tiendaOnline_DAW2022", ["ngAnimate"]);

app.controller("renderData", function ($scope, $http) {
  $http.get("productos_libros.json").
    then(function (response) {
      $scope.Libros = response.data;
    }); 
 });
