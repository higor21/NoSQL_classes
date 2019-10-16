var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Word        = require("../models/word")

// find by words from DB
router.get("/words", (req, res) => {
    const search = req.query.search || ''
    // {$regex} is used to filter by 'search' substring
    Word.find({word: {$regex: search}},(err, foundWords) => {
        if(err){
            res.json(err)
        }else{
            res.json(foundWords)
        }
    })
})

// post new word into the DB
router.post("/words", (req, res) => {
    Word.create(req.body, (err, createdWord) => {
        if(err){
            res.json(err)
        }else{
            res.json(createdWord)
        }
    })
})

// update a word from the DB
router.put("/words/:idWord", (req, res) => {
    // {new: true} : used to return the current data after PUT operation
    Word.findOneAndUpdate(req.params.idWord, req.body,{new: true}, (err, updatedWord) => {
        if(err) res.json(err)
        else res.json(updatedWord)
    })
})

// delete a word from the DB
router.delete("/words/:idWord", (req, res) => {
    Word.findByIdAndRemove(req.params.idWord, (err, deletedWord) => {
        if(err) res.json(err)
        else res.json(deletedWord)
    })
})

module.exports = router
