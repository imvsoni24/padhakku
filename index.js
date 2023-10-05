const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const cors = require("cors");
const user = require("./middlewares/user.middleware");
require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hii! this is a user signup and post management API ")
})

app.use("/api",userRoute);
app.use(user)
app.use("/api",postRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log(`Server is running on port ${process.env.port}`);
    }
    catch(error){
        console.log(error);
    }
})