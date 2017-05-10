/* server setup */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

/* instantiate the socket.io connection */
var io = require('./lib/sockets.js')(http);

/* set the base directory for the app to the directory containing server.js */
app.use(express.static(path.join(__dirname, '')));

/* routing */
app.use('/', require('./routes/indexRouting.js'));
app.use('/quotes', require('./routes/quotesRouting.js'));

/* set the server to be running ('listening') on port 3000 */
var server = http.listen(3000, function() {
    console.log('listening on port %s', server.address().port);
});

