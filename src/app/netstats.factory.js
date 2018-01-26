(function () {
    'use strict';

    angular.module('neomon.netstats.factory', [])
            .factory('NetStatsFactory', NetStatsFactory)
    ;

    /* @ngInject */
    function NetStatsFactory (
        $interval
    ) {

        function NetStats () {

            this.pollingPolicy = undefined;
            this.endPoints = undefined;
            this.lastBlockIntervalId = undefined;

            this.avgBlockTime = '24.2 s';
            this.bestBlock = 0;
            this.lastBlockTime = 0;
            this.lastBlockLabel = '';
            this.update = 0;

            this.blockDurations = [];
        }

        //=======================================================//
        //=============== Public NetStats Methods ===============//
        //=======================================================//

        NetStats.prototype.stopMonitoring = function () {

            stopLastBlockInterval(this);

            stopServicePolling(this);
        };

        NetStats.prototype.startMonitoring = function () {

            startLastBlockInterval(this);

            startServicePolling(this);
        };

        //=======================================================//
        //============== Private NetStats Methods ===============//
        //=======================================================//

        function stopLastBlockInterval (netStats) {
            if (angular.isDefined(netStats.lastBlockIntervalId)) {
                $interval.cancel(netStats.lastBlockIntervalId);
                netStats.lastBlockIntervalId = undefined;
            }
        }

        function startLastBlockInterval (netStats) {

            netStats.lastBlockTime = moment();

            netStats.lastBlockIntervalId = $interval(function () {
                var diff = moment().diff(netStats.lastBlockTime, 'seconds');

                netStats.lastBlockLabel = diff < 60 ? diff + ' s ago' : moment.duration(diff, 's').humanize() + ' ago';
            }, 500);
        }

        function stopServicePolling (netStats) {

            if (netStats.pollingPolicy) {
                netStats.pollingPolicy.stopAll();
            }
        }

        function startServicePolling (netStats) {

            if (netStats.pollingPolicy) {
                netStats.pollingPolicy.startAll();
            }
            else {
                //Defaults to 5 seconds poll
                var pollTime = parseInt(netStats.pollTime, 10) || 5000;

                netStats.pollingPolicy = neo.service.createPollingPolicy(pollTime);
            }

            netStats.firstInterval = true;

            var intervalCounter = 0;

            netStats.pollingPolicy.onInterval(function () {

                intervalCounter++;

                sortEndPoints(netStats);

                if (netStats.firstInterval) {
                    netStats.firstInterval = false;

                    netStats.lastBlockTime = moment();

                    getVersions(netStats);
                    getPeers(netStats);
                }

                //Every 10 intervals, get latest peer count
                if (intervalCounter > 10) {
                    intervalCounter = 0;
                    getPeers(netStats);
                }
            });

            startPollingBlockHeights(netStats);
        }

        function sortEndPoints (netStats) {

            netStats.endPoints.sort(function (a, b) {

                var c = a.peerCount;
                var d = b.peerCount;

                a = a.lastBlock || (a.isItUp ? 1 : 0);
                b = b.lastBlock || (b.isItUp ? 1 : 0);

                if (a !== b) {
                    return b - a;
                }

                return d - c;
            });
        }

        function startPollingBlockHeights (netStats) {

            netStats.endPoints.forEach(function (endPoint) {

                if (endPoint.type === 'RPC') {
                    endPoint.httpService.poll(netStats.pollingPolicy).getBlockCount().notify(function (result) {
                        endPoint.lastBlock = result;
                        endPoint.isItUp = true;

                        var bestBlock = netStats.bestBlock;

                        bestBlock = Math.max(bestBlock, result);

                        if (bestBlock > netStats.bestBlock) {

                            netStats.bestBlock = bestBlock;

                            if (!netStats.firstInterval) {
                                var newTime = moment();

                                netStats.blockDurations.push(newTime.diff(netStats.lastBlockTime));

                                //Keep last 10
                                if (netStats.blockDurations.length > 10) {
                                    netStats.blockDurations.shift();
                                }

                                netStats.lastBlockTime = newTime;

                                //Calculate avg block time
                                if (netStats.blockDurations.length > 1) {
                                    netStats.avgBlockTime = netStats.blockDurations.reduce(
                                                    function (total, time) {
                                                        return (total + time);
                                                    }, 0) / netStats.blockDurations.length / 1000;

                                    netStats.avgBlockTime = netStats.avgBlockTime.toFixed(1) + ' s';
                                }
                            }
                        }

                        sortEndPoints(netStats);

                        return endPoint;
                    })
                    .catch(function () {
                        if (endPoint.isItUp) {
                            endPoint.isItUp = false;
                            sortEndPoints(netStats);
                        }
                    });
                }
                else { //REST

                    endPoint.httpService.poll(netStats.pollingPolicy).getCurrentBlockHeight().notify(function (result) {
                        endPoint.lastBlock = result.height;
                        if (!endPoint.isItUp) {
                            endPoint.isItUp = true;
                            sortEndPoints(netStats);
                        }
                    })
                    .catch(function () {
                        if (endPoint.isItUp) {
                            endPoint.isItUp = false;
                            sortEndPoints(netStats);
                        }
                    });
                }
            });
        }

        function getPeers (netStats) {

            netStats.endPoints.forEach(function (endPoint) {

                if (endPoint.type === 'RPC' && endPoint.isItUp) {
                    var httpService = neo.node(endPoint.url);

                    httpService.getConnectionCount().then(function (result) {
                        endPoint.peerCount = result;
                        endPoint.isItUp = true;
                    })
                    .catch(function () {
                        endPoint.isItUp = false;
                    });

                }
            });
        }

        function getVersions (netStats) {

            netStats.endPoints.forEach(function (endPoint) {

                if (endPoint.type === 'RPC') {
                    var httpService = neo.node(endPoint.url);

                    httpService.getVersion().then(function (result) {
                        endPoint.version = result;
                    })
                    .catch(function () {
                        endPoint.version.useragent = '/ ? /';
                    });

                }
            });
        }
        
        //=======================================================//
        //================== Factory Methods ====================//
        //=======================================================//

        //Create a new NetStats instance from raw json
        function createFromJson (rawData) {
            var inst = new NetStats();

            inst.name = rawData.name;
            inst.pollTime = rawData.pollTime;

            inst.endPoints = rawData.sites.map(function (site) {

                var url, httpService, type = site.type.toUpperCase();

                if (type === 'RPC') {
                    url = site.protocol + '://' + site.url;

                    if (site.port) {
                        url += ':' + site.port;
                    }
                    else if (site.protocol === 'http') {
                        url += (inst.name === 'MainNet') ? ':10332' : ':20332';
                    }
                    else {
                        url += (inst.name === 'MainNet') ? ':10331' : ':20331';
                    }

                    httpService = neo.node(url);
                }
                else if (type === 'REST') {

                    url = site.url;

                    if (site.service === 'antChain') {
                        httpService = neo.antChain(url);
                    }
                    else if (site.service === 'neoScan') {
                        httpService = neo.neoScan(url);
                    }
                    else if (site.service === 'neon') {
                        httpService = neo.neon(url);
                    }
                    else {
                        throw new Error('Unknown REST Service: ' + site.service);
                    }
                }
                else {
                    throw new Error('Unknown endpoint type: ' + site.type);
                }

                return {
                    name: url,
                    type: type,
                    isItUp: false,
                    peerCount: ' - ',
                    version: { useragent: ' - ' },
                    location: site.location,
                    url: url,
                    locale: site.locale,
                    httpService: httpService
                };
            });

            return inst;
        }

        return {
            createFromJson: createFromJson
        };
    }

})();
