import { model, Schema } from "mongoose";

// Create an interface representing a document in MongoDB.
interface IProduct {
    price: number;
    productName: string;
    productQuantity: Number;
    paymentMethod: string;
    address: string;
    email: string;
    status: string;
}

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<IProduct>(
    {
        price: { type: Number, required: true },
        productName: { type: String, required: true },
        productQuantity: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
);

// Create a Model.
export const Product = model<IProduct>("Product", userSchema);
