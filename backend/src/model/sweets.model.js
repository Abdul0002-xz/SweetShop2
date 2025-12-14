import mongoose from "mongoose";

const sweetsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
},{timestamps:true});

export const Sweets = mongoose.model("Sweets", sweetsSchema);