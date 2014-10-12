(function ($window) {

    "use strict";

    $window.App = Ember.Application.create({

        Socket: EmberSockets.extend({
        	host: 'localhost',
        	port: 3000,
            controllers: ['index'],
            autoConnect: true
        })

    });

})(window);
