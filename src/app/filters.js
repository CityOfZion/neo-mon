(function () {
    'use strict';

    angular.module('neomon.filters', [])
        .filter('blockTime', function () {
            return function (timestamp) {
                if (timestamp === 0) {
                    return '∞';
                }
                var time = new Date().getTime(), diff = Math.floor((time - timestamp) / 1e3);

                return diff < 60 ? Math.round(diff) + ' s ago' : moment.duration(Math.round(diff), 's').humanize() + ' ago';
            };
        })
        .filter('avgTime', function () {
            return function (time) {
                return time < 60 ? parseFloat(time).toFixed(2) + ' s' : moment.duration(Math.round(time), 's').humanize();
            };
        })
        .filter('statusClass', function () {
            return function (endPoint, best) {
                if (endPoint.isItUp) {
                    if (best - endPoint.lastBlock < 3) {
                        return 'color-success';
                    }
                    else if (best - endPoint.lastBlock <= 1000) {
                        return 'color-warning';
                    }

                    return 'color-orange';
                }

                return 'color-gray';
            };
        });
})();
