const MongoClient = require('mongodb').MongoClient;
const timer = require('execution-time')()

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';
var collection

// Use connect method to connect to the server
MongoClient.connect(url, async function (err, client) {

    console.log("Connected successfully to server");
    const db = client.db(dbName);

    qty = 500000;
    slot = 10000;
    collection = db.collection('documents');

    console.info(`\nUsando Slots de tamanho ${slot} e gerando ${qty} documentos`)

    console.info(`\ndeletando documentos, caso exista ...`)
    await deleteDocuments()

    console.info(`\ngerando documentos ...`)
    const documents = genarateArray(qty)

    console.info(`\nIniciando inserção sem indexação ...`)
    time_result = await insertDocuments(documents, slot, qty)
    console.info(`Tempo de inserção sem indexação: ${time_result}`)

    console.info(`\nIniciando consulta sem indexação ...`)
    time_result = await consultDocuments()
    console.info(`Tempo de consulta: ${time_result}`)

    console.info(`\ncriando index para val1 ...`)
    await createIndex()
    console.info(`fim de criação de index`)

    console.info(`\nIniciando consulta com indexação ...`)
    time_result = await consultDocuments()
    console.info(`Tempo de consulta: ${time_result}`)

    console.info(`\nIniciando consulta com indexação e retornando apenas 'val1' ...`)
    time_result = await consultDocuments(true)
    console.info(`Tempo de consulta: ${time_result}`)

    console.info(`\ndeletando documentos ...`)
    await deleteDocuments()

    console.info(`\ncriando index para val1 ...`)
    await createIndex()
    console.info(`fim de criação de index`)

    console.info(`\nIniciando inserção com indexação ...`)
    time_result = await insertDocuments(documents, slot, qty)
    console.info(`Tempo de inserção com indexação: ${time_result}`)

    client.close()
});

const genarateArray = (qty) => {
    var arrayToInsert = []

    for (var i = 0; i < qty; i++) {
        arrayToInsert.push({
            val1: genarateNumber(),
            val2: genarateNumber()
        })
    }

    return arrayToInsert
}

const deleteDocuments = () => new Promise((resolve, reject) => {
    collection.deleteMany({}, (err) => {
        if (err) reject(err)
        resolve()
    })
})

const createIndex = () => new Promise((resolve, reject) => {
    collection.createIndex({ val1: 1 }, (err) => {
        if (err) reject(err)
        resolve()
    })
})

const insertDocuments = async (documents, slot, max) => {
    timer.start()
    for (var i = 0; i < max; i += slot)
        await insertMany(documents.slice(i, i + slot))
    return timer.stop().words
}

const consultDocuments = async (project) => {
    timer.start()
    await new Promise((resolve, reject) => {
        collection.find(
            { val1: { $gt: 0, $lt: 10 } },
            project ? { val2: 0, _id: 0 } : {}
        ).toArray((err, docsFound) => {
            if (err) reject(err)
            resolve()
        })
    })
    return timer.stop().words
}

const insertMany = (documentos) => new Promise((resolve, reject) => {
    collection.insertMany(documentos, err => {
        if (err) reject(err)
        resolve()
    })
})

const genarateNumber = () => Math.floor(Math.random() * 101)