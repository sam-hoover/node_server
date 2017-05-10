/* Globals */
var socket = io.connect();

/* on page load */
$(document).ready(function() {
    socket.emit('new_page_view', 'quotes');
});


/* socket.io communication */
socket.on('quote_added', function(data) {
    $('.output_field').text(JSON.stringify(data));
});

function addQuote() {
    var quote = $('#quote').val();
    var author = $('#author').val();

    if(!isEmpty(quote) && !isEmpty(author)) {
        socket.emit('add_quote', {"quote": quote, "author": author});
    } else {
         $('.output_field').text('invalid entry');
    }

    $('#quote').val("");
    $('#author').val("");
}

function isEmpty(str) {
    return(!str || str.length === 0 || !str.trim());
}