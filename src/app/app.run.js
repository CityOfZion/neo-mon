(function () {
    'use strict';

    angular.module('neomon')
        .run(Run);

    /* @ngInject */
    function Run (
        $window,
        $location,
        angularClient
    ) {

        if ($location.protocol() === 'https') {
            $window.location = 'http://monitor.cityofzion.io/';
        }

        neo.registry.registerProtocolClient(angularClient);
    }


})();

