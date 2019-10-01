var Word     = require("./models/word")

var words = [
    {
        word: "every",
        translation: ["todos"],
        meaning: ["when you refer to all things"], 
        examples: [
            "give me every houses in your city",
            "I'll buy every cars in that car story"
        ]
    },
    {
        word: "car",
        translation: ["carro"],
        meaning: ["it's a four-wheeled vehicle"], 
        examples: [
            "give me a car and I'll to drive it",
            "My brother won a new car"
        ]
    },
    {
        word: "sad",
        translation: ["triste"],
        meaning: ["when you are filling very bad about something"], 
        examples: [
            "he is sad because his mother argued with him",
            "I'm so sad today"
        ]
    }
]

function seedDB(){
    Word.deleteMany({}, function(err){
        if(!err){
            words.forEach(w => Word.create(w))
        }
    })
}

module.exports = seedDB