(function () {
    'use strict';

    angular.module('neomon.view.controller', [])
        .controller('ViewController', ViewController)
    ;

    /* @ngInject */
    function ViewController (
        $http,
        NetStatsFactory
    ) {

        var vm = this;

        var cacheNetworkStats = {};

        vm.networkList = {
            mainnet: {
                label: 'MainNet'
            },
            testnet: {
                label: 'TestNet'
            }
        };

        vm.changeNetwork = changeNetwork;
        vm.currentNetwork = 'MainNet';

        changeNetwork('mainnet');

        function loadConfiguration (id) {

            stopMonitoring();

            if (cacheNetworkStats[id]) {
                vm.netStats = cacheNetworkStats[id];

                startMonitoring();
            }
            else {

                $http({method: 'GET', url: id + '.json'}).then(function (result) {

                    cacheNetworkStats[id] = NetStatsFactory.createFromJson(result.data);

                    vm.netStats = cacheNetworkStats[id];

                    startMonitoring();
                });
            }
        }

        function changeNetwork (id) {

            vm.currentNetwork = vm.networkList[id].label;

            loadConfiguration(id);
        }

        function stopMonitoring () {
            if (vm.netStats) {
                vm.netStats.stopMonitoring();
            }
        }

        function startMonitoring () {
            vm.netStats.startMonitoring();
        }
    }

})();
