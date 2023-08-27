import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    list: [{
        type: Schema.Types.ObjectId, ref: "item"
    }]
})


export const Favorite = mongoose.model("favorite", FavoriteSchema)