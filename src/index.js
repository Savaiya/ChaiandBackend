import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

import express from "express";
const app = express()

dotenv.config({
    path: './env'
});

connectDB()
.then(()=>{
    app.on("error",(error)=>{
            console.log("ERRR: ",error);
            throw error
    })
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at PORT : ${process.env.PORT}`);
    })

})
.catch((err)=>{
    console.log("Monogo DB connection failed!!",err);
})


/*
import express from "express"
const app = express()

// semicolon is here becuase it is a professional approach; as if editor automatically doesn't place semicolon at the end of line so it might cause issue in runtime tha's why to enccounter this issue professional people place this semicolonn.
;( async()=>{
    try{
       await mongoose.connect( `${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })
       app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
       })

    }
    catch(error) {
        console.error("ERROR",error)
        throw error
    }
})()
*/
app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
       })

