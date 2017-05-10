var http = require('http');

function httpGet(url_content, socket) {
    http.request(url_content, function(response) {
        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });

        response.on('end', function() {
            socket.emit('api_response', JSON.parse(str));
        });
    }).end();
}

module.exports.httpGet = httpGet;