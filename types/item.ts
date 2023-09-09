import { ObjectId } from "mongoose";

export interface IItem {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    quantity: number;
    img: string
}
