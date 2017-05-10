var mongoClient = require('mongodb').MongoClient;
var deasync = require('deasync');
var dbConnection = null;
var url = 'mongodb://localhost:27017/siteDb';
var ObjectId = require('mongodb').ObjectID;
var done = false;

/* creates a connection to the monogo database
 */
mongoClient.connect(url, function(err, db) {
    console.log("Connected to the database: %s", db.databaseName);
    dbConnection = db;
    //dbConnection = mongoClient.db('siteDb');

    done = true;
});

// Make sure database is connected before continuing
deasync.loopWhile(function(){return !done;});


function createResult(status, obj) {
    return({
        "status": status,
        "content": obj
    });
}

/* insert
 *
 * inserts an object into a collection
 * 
 * params:
 *      collection: (str) the name of the collection to be inserted into
 *      obj: (Object) the object to be inserted into the specified collection
 */
function insert(collection, obj) {
    var status = null;
    var done = false;
    dbConnection.collection(collection).insertOne(obj, function(err, result) {
        if(result.insertedCount === 1) {
            status = createResult('success', result.ops[0]);
        } else {
            status = createResult('failure', {});
        }
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(status);
}

/* query
 *
 * queries a list of objects from a collection
 * 
 * params:
 *      collection: (str) the name of the collection to be queried from
 *      obj: (Object) the object to be queried from the specified collection
 */
function query(collection, obj) {
    var result = null;
    var done = false;
    dbConnection.collection(collection).find(obj).toArray(function(err, docs) {
        if(!err) {
            result = createResult('success', docs);
        } else {
            result = createResult('failure', []);
        }
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(result);
}

/* queryOne
 *
 * queries an object from a collection
 * 
 * params:
 *      collection: (str) the name of the collection to be queried from
 *      obj: (Object) the object to be queried from the specified collection
 */
function queryOne(collection, obj) {
    var result = null;
    var done = false;
    dbConnection.collection(collection).findOne(obj, function(err, docs) {
        if(!err) {
            result = createResult('success', docs);
        } else {
            result = createResult('failure', {});
        }
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(result);
}

/* updateOne
 *
 * updates an object in a collection
 * 
 * params:
 *      collection: (str) the name of the collection to be updated
 *      id: (str) the id of the object to be updated
 *      obj: (Object) the fields to be updated
 */
function updateOne(collection, id, obj) {
    var status = 'failure';
    var done = false;
    dbConnection.collection(collection).update({_id: ObjectId(id)}, {$set: obj}, function(err, result) {
        if(result.result.nModified === 1) {
            status = 'success';
        }
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(status);
}

/* deleteOne
 *
 * deletes an object from a collection
 * 
 * params:
 *      collection: (str) the name of the collection to be deleted from
 *      id: (str) the id of the object to be deleted
 */
function deleteOne(collection, id) {
    var status = 'failure';
    var done = false;

    dbConnection.collection(collection).deleteOne({_id: ObjectId(id)}, function(err, result) {
        if(result.deletedCount === 1) {
            status = 'success';
        }
        
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(status);
}

/* getDocumentCount
 *
 * returns the number of documents in a collection
 * 
 * params:
 *      collection: (str) the name of the collection
 */
function getDocumentCount(collection) {
    var done = false;
    var docCount = null;
    dbConnection.collection(collection).count(function(err, count) {
        docCount = count;
        done = true;
    });
    deasync.loopWhile(function(){return(!done);});
    return(docCount);
}


/* createNewPageView
 *
 * creates a new page view object for the specified page with the current date and time
 * 
 * params:
 *      page: (str) the name of the page that was viewed
 */
function createNewPageView(page) {
    var datetime = new Date();
    var date = datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate();
    var time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    
    return({
        "page": page,
        "date": date,
        "time": time,
        "tz": 'pst'
    });
}


module.exports.insert = insert;
module.exports.query = query;
module.exports.queryOne = queryOne;
module.exports.updateOne = updateOne;
module.exports.deleteOne = deleteOne;
module.exports.getDocumentCount = getDocumentCount;
module.exports.createNewPageView = createNewPageView;
