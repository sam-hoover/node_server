var api = require('./api.js');
var db = require('./database.js');

module.exports = function(http) {
    var io = require('socket.io')(http);

    /* socket io communication */
    io.on('connection', function(socket){ 
        
        socket.on('api_request', function(data) {
            api.httpGet(data, socket);
        });

        socket.on('new_page_view', function(page) {
            db.insert('views', db.createNewPageView(page));
        });

        socket.on('add_quote', function(data) {
            var status = db.insert('quotes', data);
            socket.emit('quote_added', status);
        });

    });

    return(io);
}

