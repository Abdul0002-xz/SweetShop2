import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then(()=>{
            console.log("Connected to database successfully");
        })
    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
    }
}