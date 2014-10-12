(function($process) {

    "use strict";

    var express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        io          = require('socket.io').listen(server),
        fs          = require('fs'),
        _           = require('underscore');

    // Begin Express so the statistics are available from the `localPort`.
    app.use(express.static(__dirname + '/'));
    server.listen($process.env.PORT || 3000);

    /**
     * @property name
     * @type {String[]}
     */
    var sprints = [];

    /**
     * @on connection
     */
    io.sockets.on('connection', function (socket) {
        console.log(socket.id + " has connected");

        socket.on('create_sprint', function(name, password) {
            sprints[name] = password;
            socket.join(name);
            console.log(socket.id + " joining room:" + name);
            socket.emit('changeRoom', name);
            console.log(sprints);
        });

        socket.on('join_sprint', function(name, password) {
            console.log(sprints);
            if (sprints[name] === password) {
                socket.join('name');
                console.log(socket.id + " joining room:" + name);
                socket.emit('changeRoom', name);
            } else {
                console.log(socket.id + " with the wrong password!");
            }
            console.log(sprints);
        });
    });

})(process);
