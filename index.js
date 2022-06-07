"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv = require("dotenv");
var express = require("express");
var fs_1 = require("fs");
var marked_1 = require("marked");
var mongoose_1 = require("mongoose");
var nodemailer = require("nodemailer");
var Order_Model_1 = require("./Model/Order.Model");
var Product_Model_1 = require("./Model/Product.Model");
var Order_validate_1 = require("./Validation/Order.validate");
dotenv.config();
// app initialize
var app = express();
var PORT = process.env.PORT || 5000;
// global middleware
app.use(express.json());
// create a transporter for send mail
var transporter = nodemailer.createTransport({
    service: "SendinBlue",
    auth: {
        user: process.env.SendInBlueUser,
        pass: process.env.SendInBluePass
    }
});
app.get("/", function (req, res) {
    var path = __dirname + "/README.md";
    console.log(path);
    (0, fs_1.readFile)(path, "utf8", function (err, data) {
        if (err) {
            console.log(err);
            res.json({ err: err });
        }
        res.send((0, marked_1.marked)(data.toString()));
    });
});
// get all orders by filter
app.get("/orders", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var priceFrom, priceTo, dateFrom, date, tempDate, dateTo, orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                priceFrom = req.query.priceFrom || 0;
                priceTo = req.query.priceTo || Infinity;
                dateFrom = new Date("11/11/2019").toLocaleDateString();
                date = req.query.dateTo;
                tempDate = new Date().toLocaleDateString().split("/");
                tempDate[2] = tempDate[2] + 1;
                dateTo = date
                    ? new Date(date).toLocaleDateString()
                    : tempDate.join("/");
                return [4 /*yield*/, Order_Model_1.Order.find({
                        price: { $gte: priceFrom, $lte: priceTo },
                        createdAt: { $gte: dateFrom, $lte: dateTo }
                    })];
            case 1:
                orders = _a.sent();
                res.status(200).json({
                    message: "All orders",
                    success: true,
                    orders: orders,
                    dateTo: dateTo
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.json({ message: error_1.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// get specific order
app.get("/orders/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_Model_1.Order.findById(req.params.id)];
            case 1:
                order = _a.sent();
                res.status(200).json({
                    message: "Orders",
                    success: true,
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.json({ message: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// create a new order
app.post("/order", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newOrder, order, newProduct, product, mailOptions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, Order_validate_1.OrderValidationSchema.validate(req.body, {
                        abortEarly: false
                    })];
            case 1:
                data = _a.sent();
                // default value of status
                data.status = "Inserted";
                newOrder = new Order_Model_1.Order(data);
                return [4 /*yield*/, newOrder.save()];
            case 2:
                order = _a.sent();
                newProduct = new Product_Model_1.Product({
                    name: data.orderName,
                    quantity: data.orderQuantity,
                    price: data.price
                });
                return [4 /*yield*/, newProduct.save()];
            case 3:
                product = _a.sent();
                mailOptions = {
                    from: "samiulalimsaad@gmail.com",
                    to: order.email,
                    subject: "Order purchase successfully",
                    html: "<h3>Hi ".concat(order.email, ",</h3>\n                    <p>thank you for purchase The order</p>\n                    <p>you paid ").concat(order.price, " for ").concat(order.orderName, " Quantity ").concat(order.orderQuantity, ".</p>\n                    <p>Thank You</p>")
                };
                // send mail
                return [4 /*yield*/, transporter
                        .sendMail(mailOptions)
                        .then(function (res) { return console.log("Successfully sent"); })["catch"](function (err) { return console.log("Failed ", err); })];
            case 4:
                // send mail
                _a.sent();
                res.status(200).json({ message: "Inserted", success: true, order: order });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.json({
                    message: error_3.errors.length ? error_3.errors : error_3.message
                });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// update order status by specific id
app.patch("/orders/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_Model_1.Order.findByIdAndUpdate(req.params.id, {
                        $set: {
                            status: "Done"
                        }
                    }, {
                        "new": true
                    })];
            case 1:
                order = _a.sent();
                res.status(200).json({
                    message: "Order deleted",
                    success: true,
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.json({ message: error_4.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete order by specific id
app["delete"]("/orders/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_Model_1.Order.findByIdAndDelete(req.params.id)];
            case 1:
                order = _a.sent();
                res.status(200).json({
                    message: "Order deleted",
                    success: true,
                    order: order
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.json({ message: error_5.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// delete order by specific email
app["delete"]("/orders", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Order_Model_1.Order.deleteMany({ email: req.query.email })];
            case 1:
                orders = _a.sent();
                res.status(200).json({
                    message: "Order deleted",
                    success: true,
                    orders: orders
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.json({ message: error_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// app run
app.listen(PORT, function () {
    console.log("server is running at http://localhost:".concat(PORT));
    mongoose_1["default"].connect(process.env.DATABASE_URL, {}, function () {
        console.log("Database is connected");
    });
});
