import mongoose, { Schema, model } from "mongoose";



const authorSchema = new Schema({
    name: {type: String, required: true},
    bio: String,
    birthDate: {type:Date, timestamps: true },
    books:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]

}) 


export const Author = model("Author", authorSchema)
