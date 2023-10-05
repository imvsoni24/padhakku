const express = require("express");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRoute = express.Router();

userRoute.post("/signup",async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        if (!name || !email || !password) {
            return res.json({ message: 'All fields are required.' });
        }

        let findUser = await userModel.findOne({email});

        if(findUser){
            return res.json({ message: 'Email id is already registered.' });
        }

        bcrypt.hash(password,5,async(error,hash)=>{
            if(error){
                return res.json({message:error});
            }
            const newUser = new userModel({name,email,password:hash});
            await newUser.save();
            res.json({ message: 'User registration successful.' });
        }) 
    }
    catch(error){
        res.json({ message: error });
    }

})


userRoute.post("/signin",async(req,res)=>{
    try{
        const {email,password} = req.body;
        let findUser = await userModel.findOne({email});
        if(!findUser){
            return res.json({ message: "User is not exist, please register" });
        }
        bcrypt.compare(password,findUser.password,(error,result)=>{
            if(result){
                const token = jwt.sign({userId:findUser._id},process.env.key);
                if(token){
                    jwt.verify(token,process.env.key,(error,decoded)=>{
                        if(decoded){
                            res.json({message:"Successfully login",token:token})
                        }else{
                            res.json({message:error})
                        }
                    })
                }
            }else{
                res.json({message:"User credentials are wrong"})
            }
        })
    }
    catch(error){
        res.json({ message: error });
    }
})

module.exports = userRoute;