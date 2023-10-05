const jwt = require("jsonwebtoken");
require("dotenv").config()

const user = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,process.env.key,(error,decoded)=>{
            if(decoded){
                req.body.userId = decoded.userId;
                next()
            }else{
                res.json({message:error})
            }
        })
    }else{
        res.json({message:"Please login first"})
    }
}

module.exports = user