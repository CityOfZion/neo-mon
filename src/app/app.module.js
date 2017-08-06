(function () {
    'use strict';
    angular.module('neomon', [

        'angularMoment',

        'neo.angularClient', //angularClient used by neo-api-js in app/lib

        'neomon.filters',
        'neomon.directives.icon',
        'neomon.netstats.factory',
        'neomon.view.controller'
    ]);

})();

