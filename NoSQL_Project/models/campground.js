var mongoose = require("mongoose")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    images_list: [],
    description: String,
    features_list: [],
    stars: [],
    score: {type: String, default: '0'},
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

module.exports = mongoose.model("Campground", campgroundSchema);