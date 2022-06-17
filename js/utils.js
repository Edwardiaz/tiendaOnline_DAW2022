//codigo Angular
var app = angular.module("tiendaOnline_DAW2022", ["ngAnimate"]);

app.controller("renderData", function ($scope, $http) {
  $http.get("productos_libros.json").
    then(function (response) {
      $scope.Libros = response.data;

      $scope.selectInfo=function(id) {
        for(i = 0; i<response.data.productos.length; i++){
          if(response.data.productos[i].prod_id == id){
            $scope.imagen = response.data.productos[i].imagen;
            $scope.descripcion = response.data.productos[i].descripcion;
            $scope.precio = response.data.productos[i].precio;
            $scope.nombre = response.data.productos[i].nombre;
            $scope.libro = response.data.productos[i];
            $scope.libroActual = id;
          }
        }
      }
    });

  $scope.carrito = [];
  
  var buscarLibroById = function(libros, id) {
    return _.find(libros, function(libro) {
      return libro.prod_id === id;
    });
  };

  $scope.costo = function(libro) {
    return libro.cantidad * libro.precio;
  };

  $scope.total = function() {
    var total =  _.reduce($scope.carrito, function(suma, libro) {
      return suma + $scope.costo(libro);
    }, 0);
    console.log('total: ' + total);
    return total;
  };

  $scope.agregarLibro = function(añadirLibro) {
    var libroEncontrado = buscarLibroById($scope.carrito, añadirLibro.prod_id);
    if (libroEncontrado) {
      libroEncontrado.cantidad += añadirLibro.cantidad;
    }
    else {
      $scope.carrito.push(angular.copy(añadirLibro));}
  };

  $scope.limpiarCarrito = function() {
    $scope.carrito.length = 0;
  };

  $scope.validarCompra = function (form){
    if($scope.carrito.length==0){
      $('#carritoVacio').modal({
        show: true
      });
    }
    else{
      $('#carrito').modal({
        show: true
      });
    }
  }

 });


