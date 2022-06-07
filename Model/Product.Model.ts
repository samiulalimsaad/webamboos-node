import { model, Schema } from "mongoose";
import { ProductInterface } from "../interfaces/Product.interface";

// Create a Schema corresponding to the document interface.
const productSchema = new Schema<ProductInterface>(
    {
        price: { type: Number, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

// Create a Model.
export const Product = model<ProductInterface>("Product", productSchema);
