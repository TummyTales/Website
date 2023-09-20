const express = require("express");
const dotenv = require("dotenv")
const app = express();
const mongoose=require('mongoose');
mongoose.set('strictQuery',false);

dotenv.config();
const port = process.env.PORT || 8000;
const conn = process.env.CONN_STRING;

const homeRoutes = require("./routes/home");
// const authRoutes = require("./routes/login");

app.use("/", homeRoutes);
// app.use("/login", authRoutes);



const start= async()=>{
    try{
        await mongoose.connect(conn);
        app.listen(port, () => {

            console.log("Started")
        });
    }catch(e){
        console.log('error:',e.message );
    }

};

start();

