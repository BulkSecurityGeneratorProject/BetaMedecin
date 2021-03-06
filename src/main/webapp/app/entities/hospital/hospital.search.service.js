(function() {
    'use strict';

    angular
        .module('betaMedecinApp')
        .factory('HospitalSearch', HospitalSearch);

    HospitalSearch.$inject = ['$resource'];

    function HospitalSearch($resource) {
        var resourceUrl =  'api/_search/hospitals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
