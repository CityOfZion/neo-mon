(function () {
    'use strict';

    angular.module('neo.angularClient', [])
            .factory('angularClient', angularClient);

    function angularClient ($http) {

        function invoke (restOptions) {
            return $http(restOptions).then(function (result) {
                return result;
            });
        }

        function serialize (obj) {
            return obj && Object.keys(obj).map(function (key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
                    }).join('&');
        }

        function filterKeys (srcOptions, keys) {
            return keys.reduce(function (result, k) {
                if (srcOptions[k]) {
                    result[k] = srcOptions[k];
                }

                return result;
            }, {});
        }

        function buildRequestOptions (options) {

            //Build Url with queryParams
            var paramStr = options.queryParams && serialize(options.queryParams);

            if (paramStr) {
                options.url = options.url + '?' + paramStr;
            }

            // Don't allow any undefined values into Fetch Options
            options = filterKeys(options, ['method', 'url', 'params', 'body', 'data', 'cache', 'headers']);

            //If request takes longer it will be canceled
            options.timeout = 5000;

            options.headers = {};

            options.headers['Accept'] = 'application/json';
            options.headers['Content-Type'] = 'text/plain'; //Remove options pre-flight by using text/plain

            if (options.body) {
                options.body = JSON.stringify(options.body);
            }

            if (options.data) {
                options.data = JSON.stringify(options.data);
            }

            return options;
        }

        return {
            invoke: invoke,
            buildRequestOptions: buildRequestOptions
        };
    }

})();