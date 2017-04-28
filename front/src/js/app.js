var app = angular.module('alMundo', ['ui.router', 'rzModule']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('hotels', {
        url: '/',
        controller: 'appController'
    });
    $urlRouterProvider.otherwise('/');
});

app.controller('appController', function($scope, $http, $stateParams, $state, $location, $window) {

    function loadHotels() {

        $scope.loading = true;
        $scope.hotels = null;

        // Consumimos los hoteles
        $http.get('http://localhost:3000/hotels')
            .then(
                function(response) {
                    var data = response.data;
                    $scope.hotels = data ? data : 'Error al cargar hoteles';
                }
            ).finally(function() {
                $scope.loading = false;
            });

    }

    function updateStars(starRating) {
        if (starRating === 0) {
            $scope.selectedStars = [];
            $scope.selectedStars.all = true;
        } else if ($scope.selectedStars.all) {
            delete $scope.selectedStars.all;
        }

    }

    // Inicilizamos el slider de filtro de precios
    $scope.rangeInfo = {
        minValue: 0,
        maxValue: 3200,
        options: {
            ceil: 3200,
            floor: 0,
            translate: function(value) {
                return '$' + value;
            }
        }
    };

    // Inicilizamos checkbox de filtro de estrellas
    $scope.selectedStars = { all: true, one: false, two: false, three: false, four: false, five: false };

    loadHotels();


});

app.directive('ngTooltip', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).hover(function() {
                $(element).tooltip('show');
            }, function() {
                $(element).tooltip('hide');
            });
        }
    };
});


// Filtros (Precio - Estrellas)

app.filter('priceRange', function() {
    return function(items, rangeInfo) {

        var filtered = [];

        var min = parseInt(rangeInfo.minValue);
        var max = parseInt(rangeInfo.maxValue);

        angular.forEach(items, function(item) {
            if (item.price >= min && item.price <= max) {
                filtered.push(item);
            }
        });

        return filtered;
    };
});

app.filter('starsFilter', function() {
    return function(hotels, selectedStars) {
        var filtered = [];
        if (!selectedStars.all) {
            angular.forEach(hotels, function(hotel) {

                switch (hotel.stars) {

                    case 1:
                        {
                            if (selectedStars.one) {
                                filtered.push(hotel);
                            }
                        }
                        break;
                    case 2:
                        {
                            if (selectedStars.two) {
                                filtered.push(hotel);
                            }
                        }
                        break;
                    case 3:
                        if (selectedStars.three) {
                            filtered.push(hotel);
                        }
                        break;
                    case 4:
                        {
                            if (selectedStars.four) {
                                filtered.push(hotel);
                            }
                        }
                        break;
                    case 5:
                        {
                            if (selectedStars.five) {
                                filtered.push(hotel);
                            }
                        }
                        break;
                }
            });
        } else {
            filtered = hotels;
        }
        return filtered;
    };
})