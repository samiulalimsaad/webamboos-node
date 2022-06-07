"use strict";
exports.__esModule = true;
exports.Order = void 0;
var mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
var orderSchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    orderName: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true, "default": "Inserted" }
}, { timestamps: true });
// Create a Model.
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
