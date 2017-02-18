/**
 * Created by Luming on 2/14/2017.
 */
angular
    .module('guguorderapp').factory('GuguInterceptor', function ($q) {
    return {
        // On request success
        request: function (config) {
            // console.log(config); // Contains the data about the request before it is sent.
            // Return the config or wrap it in a promise if blank.
            return config || $q.when(config);
        },

        // On request failure
        requestError: function (rejection) {
            // console.log(rejection); // Contains the data about the error on the request.
            // Return the promise rejection.
            return $q.reject(rejection);
        },

        // On response success
        response: function (response) {

            // Return the response or promise.
            return response || $q.when(response);
        },

        // On response failture
        responseError: function (rejection) {
            // console.log(rejection); // Contains the data about the error.

            // Return the promise rejection.
            return $q.reject(rejection);
        }
    };
});