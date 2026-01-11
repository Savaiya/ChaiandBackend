import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

console.log("trying to connect")

const connectDB = async()=> {
    console.log("trying to connect1")
    try{
        const connectionInstance = await mongoose.connect
        (`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
 
    } catch(error){
        console.log("MONGOODB connection error FAILED", error);
        process.exit(1)
    }
}
console.log("trying to connect2")
export default connectDB;