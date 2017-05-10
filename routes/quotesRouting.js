var router = require('express').Router()
var path = require('path');
var db = require('./../lib/database.js');


function isValid(entry) {
    if(entry === null || entry === ' ') {
        return(false);
    }
    return(true);
}


function createQuote(quote, author) {
    return({
        "quote": quote,
        "author": author
    });
}


function createResult(status, obj) {
    return({
        "status": status,
        "content": obj
    });
}


router.use(function(req, res, next) {
  console.log('method: %s', req.method);
  next();
});


router.param('id', function(req, res, next, id) {
    if(isValid(id)) {
        next();
    } else {
        res.sendStatus(400);
    }
});


router.param('quote', function(req, res, next, id) {
    if(isValid(id)) {
        next();
    } else {
        res.sendStatus(400);
    }
});


router.param('author', function(req, res, next, id) {
    if(isValid(id)) {
        next();
    } else {
        res.sendStatus(400);
    }
});


router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../client/views/quotes.html'));
});


/* retrieve
 * gets the id of the specified quote and author
 */
router.get('/id/quote/:quote/author/:author', function(req, res) {
    var results = db.queryOne('quotes', {"quote": req.params.quote, "author": req.params.author});
    res.send(results);
});


/* retrieve
 * gets all quotes by the given author
 */
router.get('/author/:author', function(req, res) {
    var results = db.query('quotes', {"author": req.params.author});
    res.send(results);
});


/* retrieve
 * gets the quote object containing the specified quote text
 */
router.get('/quote/:quote', function(req, res) {
    var results = db.queryOne('quotes', {"quote": req.params.quote});
    res.send(results);
});


/* count
 * gets the number of quotes stored in the database
 */
router.get('/count', function(req, res) {
    var count = db.getDocumentCount('quotes');
    console.log(count);
    res.send({"count": count});
});


/* create
 * creates a quote object with the specified quote and author
 */
router.post('/quote/:quote/author/:author/create', function(req, res) {
    var result = db.insert('quotes', createQuote(req.params.quote, req.params.author));
    res.send(result);
});


/* update
 * updates the quote by id
 */
router.post('/id/:id/quote/:quote/update', function(req, res) {
    var status = db.updateOne('quotes', req.params.id, {"quote": req.params.quote});
    res.send({status: status});
});


/* update
 * updates the author by id
 */
router.post('/id/:id/author/:author/update', function(req, res) {
    var status = db.updateOne('quotes', req.params.id, {"author": req.params.author});
    res.send({status: status});
});


/* update
 * updates the quote and author by id
 */
router.post('/id/:id/quote/:quote/author/:author/update', function(req, res) {
    var status = db.updateOne('quotes', req.params.id, {"quote": req.params.quote, "author": req.params.author});
    res.send({status: status});
});


/* delete
 * deletes a quote by id
 */
router.delete('/id/:id/delete', function(req, res) {
    var status = db.deleteOne('quotes', req.params.id);
    res.send({status: status});
});


/* handles non-route specific url parameters 
 * 
 * form: /quotes?quote=<some quote>&author=<some author>
 */
/*router.post('/', function(req, res){
    var quote = req.query.quote;
    var author = req.query.author;

    if(!isValid(quote) || !isValid(author)) {
        res.sendStatus(400);
    } else {
        //db.insertToCollection('quotes', db.createNewQuote(quote, author));
        res.send(quote + ' --' + author);
    }
});*/


module.exports = router;