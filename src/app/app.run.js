(function () {
    'use strict';

    angular.module('neomon')
        .run(Run);

    /* @ngInject */
    function Run (
        angularClient
    ) {
        neo.registry.registerProtocolClient(angularClient);
    }


})();

