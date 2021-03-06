import * as dotenv from "dotenv";
import * as express from "express";
import { readFile } from "fs";
import { marked } from "marked";
import mongoose from "mongoose";
import * as nodemailer from "nodemailer";
import { Order } from "./Model/Order.Model";
import { Product } from "./Model/Product.Model";
import { OrderValidationSchema } from "./Validation/Order.validate";

// load env variables
dotenv.config();

// app initialize
const app = express();
const PORT = process.env.PORT || 5000;

// global middleware
app.use(express.json());

// create a transporter for send mail
const transporter = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
        user: process.env.SendInBlueUser,
        pass: process.env.SendInBluePass,
    },
});

app.get("/", (req: express.Request, res: express.Response) => {
    const path = __dirname + "/README.md";
    console.log(path);
    readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log(err);
            res.json({ err });
        }
        res.send(marked(data.toString()));
    });
});

// get all orders by filter
app.get("/orders", async (req: express.Request, res: express.Response) => {
    try {
        const priceFrom = req.query.priceFrom || 0;
        const priceTo = req.query.priceTo || Infinity;

        const dateFrom = new Date("11/11/2019").toLocaleDateString();
        const date: any = req.query.dateTo;

        const tempDate = new Date().toLocaleDateString().split("/");
        tempDate[2] = tempDate[2] + 1;
        const dateTo = date
            ? new Date(date).toLocaleDateString()
            : tempDate.join("/");

        // filter orders by criteria
        const orders = await Order.find({
            price: { $gte: priceFrom, $lte: priceTo },
            createdAt: { $gte: dateFrom, $lte: dateTo },
        });

        res.status(200).json({
            message: "All orders",
            success: true,
            orders,
            dateTo,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// get specific order
app.get("/orders/:id", async (req: express.Request, res: express.Response) => {
    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            message: "Orders",
            success: true,
            order,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// create a new order
app.post("/order", async (req: express.Request, res: express.Response) => {
    try {
        // validate the requested data
        const data = await OrderValidationSchema.validate(req.body, {
            abortEarly: false,
        });

        // default value of status
        data.status = "Inserted";

        const newOrder = new Order(data);

        const order = await newOrder.save();

        const newProduct = new Product({
            name: data.orderName,
            quantity: data.orderQuantity,
            price: data.price,
        });

        const product = await newProduct.save();

        // mail options
        const mailOptions = {
            from: "samiulalimsaad@gmail.com",
            to: order.email,
            subject: "Order purchase successfully",
            html: `<h3>Hi ${order.email},</h3>
                    <p>thank you for purchase The order</p>
                    <p>you paid ${order.price} for ${order.orderName} Quantity ${order.orderQuantity}.</p>
                    <p>Thank You</p>`,
        };

        // send mail
        await transporter
            .sendMail(mailOptions)
            .then((res) => console.log("Successfully sent"))
            .catch((err) => console.log("Failed ", err));

        res.status(200).json({ message: "Inserted", success: true, order });
    } catch (error) {
        res.json({
            message: error.errors.length ? error.errors : error.message,
        });
    }
});

// update order status by specific id
app.patch(
    "/orders/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            // update status to 'Done'
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        status: "Done",
                    },
                },
                {
                    new: true,
                }
            );
            res.status(200).json({
                message: "Order deleted",
                success: true,
                order,
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }
);

// delete order by specific id
app.delete(
    "/orders/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);

            res.status(200).json({
                message: "Order deleted",
                success: true,
                order,
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }
);

// delete order by specific email
app.delete("/orders", async (req: express.Request, res: express.Response) => {
    try {
        const orders = await Order.deleteMany({ email: req.query.email });

        res.status(200).json({
            message: "Order deleted",
            success: true,
            orders,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// app run
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(process.env.DATABASE_URL, {}, () => {
        console.log("Database is connected");
    });
});
