var router = require('express').Router()
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/views/index.html'));
});


module.exports = router;