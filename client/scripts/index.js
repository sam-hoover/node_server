/* Globals */
var socket = io.connect();

/* on page load */
$(document).ready(function() {
    socket.emit('new_page_view', 'home');
});
