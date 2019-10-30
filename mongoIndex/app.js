const MongoClient = require('mongodb').MongoClient;
const timer = require('execution-time')()
 
// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'myproject';
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const array = genarateArray()

    timer.start()
    time_result = await insertDocuments(db, a)
    timer.stop().time

    client.close();
});

const genarateArray = function(qty){
    var arrayToInsert = []

    for(var i=0; i<qty; i++){
        arrayToInsert.push({
            val1: genarateNumber,
            val2: genarateNumber
        })
    }

    return arrayToInsert
}

// Insert the documents in slots and return the time of insertion
const insertDocuments = async function(db, slot, max) {
    // Get the documents collection
    const collection = db.collection('documents');

    var total_time = 0;

    // Insert some documents
    for(var i=0; i < max; i+=slot){
        collection.insertMany(arrayToInsert[index, index + slot], function(err, result) {
            if(err) console.error(err)
            else{
            }
        });
    }
}

const genarateNumber = () => Math.floor(Math.random()*101)