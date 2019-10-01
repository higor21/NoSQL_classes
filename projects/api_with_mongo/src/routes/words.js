var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Word        = require("../models/word"),
    User        = require("../models/user")

router.get("/users", (req, res) => {
    User.find((err, users) => {
        if(!err)
            res.send(users)
    })
})

router.get("/user/:idUser/words", (req, res) => {
    User.findById(req.params.idUser).populate('words').exec((err, foundUser) => {
        if(err){
            res.json(err)
        }else{
            const search = req.query.search
            if(foundUser && foundUser.words){
                if(search){
                    foundUser.words = foundUser.words.filter(e => { return e.word.includes(search) })
                }
                res.json(foundUser.words)
            }else{
                res.send("something is wrong")
            }
        }
    })
})

router.post("/user/:idUser/words", (req, res) => {
    User.findById(req.params.idUser).populate('words').exec((err, foundUser) => {
        if(err){
            res.json(err)
        }else{
            Word.create(req.body, (err, createdWord) => {
                foundUser.words.push(createdWord);
                foundUser.save((err, user_s) => {
                    if(err) res.json(err)
                })
            })
        }
    })
})

router.put("/user/:idUser/words/:idWord", (req, res) => {
    Word.findOneAndUpdate(req.params.idWord, req.body, (err, updatedWord) => {
        if(err) res.json(err)
    })
})

router.delete("/user/:idUser/words/:idWord", (req, res) => {
    User.findById(req.params.idUser).populate('words').exec( (err, foundUser) => {
        if(err){
            res.json(err)
        }else{
            if(foundUser && foundUser.words){
                foundUser.words = foundUser.words.filter(w => w._id != req.params.idWord)
                foundUser.save()
            }
            Word.findByIdAndRemove(req.params.idWord);
        }
    })
})

module.exports = router
