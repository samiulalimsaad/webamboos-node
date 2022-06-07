import { model, Schema } from "mongoose";
import { OrderInterface } from "../interfaces/Order.interface";

// Create a Schema corresponding to the document interface.
const orderSchema = new Schema<OrderInterface>(
    {
        price: { type: Number, required: true },
        orderName: { type: String, required: true },
        orderQuantity: { type: Number, required: true },
        paymentMethod: { type: String, required: true },
        address: { type: String, required: true },
        email: { type: String, required: true },
        status: { type: String, required: true, default: "Inserted" },
    },
    { timestamps: true }
);

// Create a Model.
export const Order = model<OrderInterface>("Order", orderSchema);
