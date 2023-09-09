import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    list: [{
        id: { type: Schema.Types.ObjectId, ref: "item" },
        quantity: { type: Number }
    }]
})


export const Card = mongoose.model("card", CardSchema)