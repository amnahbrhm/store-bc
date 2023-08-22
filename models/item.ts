import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    quantity: {
        type: String, required: true, default: "0"
    },
    fav: {
        type: Boolean, required: true, default: false
    },
    img:
    {
        type: String, required: true, default: "img-1692706958914.png"
    }
})


export const Item = mongoose.model("item", ItemSchema)