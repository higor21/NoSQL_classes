const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    for(var i=0; i<1000000; i+=100)
        insertDocuments(db, 100);
    client.close();
});

const insertDocuments = function(db, slot) {
    // Get the documents collection
    const collection = db.collection('documents');

    var arrayToInsert = []

    for(var i=0; i<slot; i++){
        arrayToInsert.push({
            val1: genarateNumber,
            val2: genarateNumber
        })
    }

    // Insert some documents
    collection.insertMany(arrayToInsert, function(err, result) {
        assert.equal(err, null);

    });
}

const genarateNumber = () => Math.floor(Math.random()*101)