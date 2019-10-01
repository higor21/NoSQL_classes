var User  = require("./models/user"),
    Word     = require("./models/word")

var users = [
    {
        username: "Higor",
        password: "1234",
        email: "felype.cet.15@gmail.com" 
    },
    {
        username: "Elione",
        password: "1234",
        email: "elione@gmail.com" 
    },
    {
        username: "Silvia",
        password: "1234",
        email: "silvia@gmail.com" 
    }
]

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
        word: "every",
        translation: ["todos"],
        meaning: ["when you refer to all things"], 
        examples: [
            "give me every houses in your city",
            "I'll buy every cars in that car story"
        ]
    },
    {
        word: "every",
        translation: ["todos"],
        meaning: ["when you refer to all things"], 
        examples: [
            "give me every houses in your city",
            "I'll buy every cars in that car story"
        ]
    }
]

function seedDB(){
    User.deleteMany({}, function(err){
        if(!err){
            Word.deleteMany({}, function(err){
                if(!err){
                    var k = 1
                    users.forEach(u => {
                        User.create(u, (err, createdUser) => {
                            if(!err){
                                createdUser.words = []
                                Word.create({
                                    word: `every_${k++}$`,
                                    translation: ["todos"],
                                    meaning: ["when you refer to all things"], 
                                    examples: [
                                        "give me every houses in your city",
                                        "I'll buy every cars in that car story"
                                    ]
                                }, (err, createdWord) => {
                                    if(!err){
                                        createdUser.words.push(createdWord)
                                        createdUser.save()
                                    }
                                })

                                /* u.words = []
                                words.forEach(w => {
                                    Word.create(w, (err, createdWord) => {
                                        if(!err){
                                            createdUser.words.push(createdWord)
                                        }
                                    })
                                })
                                createdUser.save() */
                            }
                        })
                    })
                }
            })
        }
    })
}

module.exports = seedDB