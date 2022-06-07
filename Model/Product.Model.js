"use strict";
exports.__esModule = true;
exports.Product = void 0;
var mongoose_1 = require("mongoose");
// Create a Schema corresponding to the document interface.
var productSchema = new mongoose_1.Schema({
    price: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
}, { timestamps: true });
// Create a Model.
exports.Product = (0, mongoose_1.model)("Product", productSchema);
