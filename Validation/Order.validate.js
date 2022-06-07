"use strict";
exports.__esModule = true;
exports.OrderValidationSchema = void 0;
var Yup = require("yup");
exports.OrderValidationSchema = Yup.object({
    price: Yup.number().required("price is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    orderName: Yup.string().required("order Name required"),
    orderQuantity: Yup.number().required("order quantity required"),
    paymentMethod: Yup.string().required("payment Method required"),
    address: Yup.string().required("address required"),
    status: Yup.string().required("status required")["default"]("Inserted")
});
