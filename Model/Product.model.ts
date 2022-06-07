import { model, Schema } from "mongoose";
import { ProductInterface } from "../interfaces/Product.interface";

// Create a Schema corresponding to the document interface.
const userSchema = new Schema<ProductInterface>(
    {
        price: { type: Number, required: true },
        productName: { type: String, required: true },
        productQuantity: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        status: { type: String, required: true, default: "Inserted" },
    },
    { timestamps: true }
);

// Create a Model.
export const Product = model<ProductInterface>("Product", userSchema);
