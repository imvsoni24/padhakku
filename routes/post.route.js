const express = require("express");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const postRoute = express.Router();

postRoute.post("/posts",async(req,res)=>{
    try{
        const {content,userId} = req.body;
        const newPost = new postModel({userId,content})
        await newPost.save()
        res.json({ message: "Post has been created" });
    }
    catch(error){
        res.json({message:error})
    }
})

postRoute.get("/posts/:userId",async(req,res)=>{
    try{
        let userId = req.params.userId
        const posts = await postModel.find({userId})
        res.json({data:posts})
    }
    catch(error){
        res.json({message:error})
    }
})

postRoute.delete("/deletepost/:postId",async(req,res)=>{
    try{
        let postId = req.params.postId;
        await postModel.findByIdAndDelete({_id:postId})
        res.json({ message: "Post has been deleted" });
    }
    catch(error){
        res.json({message:error})
    }
})

module.exports = postRoute;