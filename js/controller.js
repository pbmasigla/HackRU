(function ($app) {

    "use strict";

    $app.IndexController = Ember.Controller.extend({

        /**
         * @property actions
         * @type {Object}
         */
        actions: {

            /**
             * @method cherryPickName
             * @emit cherryPickName
             * @return {void}
             */
            create_sprint: function() {
                var sprint_name = this.get('new_sprint');
                var password = this.get('new_password');
                this.socket.emit('create_sprint', sprint_name, password);
            },

            join_sprint: function() {
                var sprint_name = this.get('join_sprint');
                var password = this.get('join_password');
                this.socket.emit('join_sprint', sprint_name, password);
            },

        },

        /**
         * @property sockets
         * @type {Object}
         */
        sockets: {

            changeRoom: function(room) {
                this.set('room', room);
            },

            displayRooms: function(sprints) {
                this.set('sprints', sprints);
            },
            // When EmberSockets makes a connection to the Socket.IO server.
            connect: function() {
                console.log('EmberSockets has connected...');
            },

            // When EmberSockets disconnects from the Socket.IO server.
            disconnect: function() {
                console.log('EmberSockets has disconnected...');
            }

        },

        room: 'default'

    });

})(window.App);
