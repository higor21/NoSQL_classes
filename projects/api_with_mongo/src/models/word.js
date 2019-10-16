var mongoose    = require("mongoose")

var wordSchema = new mongoose.Schema({
    word: String,
    translation: [],
    meaning: [], 
    examples: []
})

module.exports = mongoose.model("Word", wordSchema);