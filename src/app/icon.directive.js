(function () {
    'use strict';

    angular
        .module('neomon.directives.icon', [])
        .directive('neoIcon', neoIcon);

    function neoIcon () {

        return {
            restrict: 'E',
            scope: {
                name: '@'
            },
            link: link
        };

        function link (scope, element, attrs) {

            var value = scope.name || element[0].textContent;

            if (!value) {
                element[0].textContent = 'SVG';

                return;
            }

            var properties = {
                prefix: '#tsvg-',
                class: 'tsvg',
                role: 'img'
            };

            if (attrs.class) {
                properties.class += ' ' + attrs.class;
            }

            var svg = document.createElement('svg');
            var use = document.createElement('use');

            svg.setAttribute('role', properties.role);
            svg.setAttribute('class', properties.class);

            use.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            use.setAttribute('xlink:href', properties.prefix + value.toLowerCase());

            svg.appendChild(use);

            element[0].outerHTML = svg.outerHTML;
        }
    }

})();
