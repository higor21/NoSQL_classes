var express     = require("express"),
    bodyParser  = require("body-parser"),
    wordRoutes  = require("./routes/words"),
    app         = express(),
    port        = 3000,
    seedDB      = require("./seedDB"),
    mongoose    = require("mongoose")

const urlDB = "mongodb://localhost:27017/mywordsapi"
// conection with the database (DB)
mongoose.connect(urlDB, { useNewUrlParser: true })

// essas funções são usadas para definir  o modo de envio de dados para o backend
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

// this function is used to init fake values to the DB
seedDB()

// definition of URL routes
app.use("/", wordRoutes);

app.listen(port, process.env.ID, function(){
    console.log(`The server is running on port ${port}`)
})