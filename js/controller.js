(function ($app) {

    "use strict";

    $app.IndexController = Ember.Controller.extend({

        sprintOptions : [   
            Ember.Object.create({title: 'Create Sprint', value: 'create'}),
            Ember.Object.create({title: 'Join Sprint', value: 'join'})
        ],

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

            join_sprint: function() {
                var sprint_name = this.get('sprint_name');
                var password = this.get('sprint_password');
                var sprint_option = this.get('selected.value');
                
                if(sprint_option == "create")
                    this.socket.emit('create_sprint', sprint_name, password);
                else
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
