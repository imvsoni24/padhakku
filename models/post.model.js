const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    userId: {
        type:String,
        required:true,
    }
})

const postModel = mongoose.model("Post",postSchema);

module.exports = postModel;