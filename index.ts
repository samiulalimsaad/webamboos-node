import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";
import * as nodemailer from "nodemailer";
import { Order } from "./Model/Order.Model";
import { OrderValidationSchema } from "./Validation/Order.validate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
    service: "SendinBlue", // no need to set host or port etc.
    auth: {
        user: process.env.SendInBlueUser,
        pass: process.env.SendInBluePass,
    },
});

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
    res.json({ message: "hello" });
});

app.get("/orders", async (req: express.Request, res: express.Response) => {
    try {
        const priceFrom = req.query.priceFrom || 0;
        const priceTo = req.query.priceTo || 99999999;

        const dateFrom = new Date("11/11/2019").toLocaleDateString();
        const date: any = req.query.dateTo;
        const dateTo = date
            ? new Date(date).toLocaleDateString()
            : new Date().toLocaleDateString();

        const Orders = await Order.find({
            price: { $gte: priceFrom, $lte: priceTo },
            // createdAt: { $gte: dateFrom, $lte: dateTo },
        });

        res.status(200).json({
            message: "All Orders",
            success: true,
            Orders,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.get("/orders/:id", async (req: express.Request, res: express.Response) => {
    try {
        const order = await Order.findById(req.params.id);

        res.status(200).json({
            message: "Orders",
            success: true,
            Order,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.post("/order", async (req: express.Request, res: express.Response) => {
    try {
        const data = await OrderValidationSchema.validate(req.body, {
            abortEarly: false,
        });

        data.status = "Inserted";

        const newOrder = new Order(data);

        const order = await newOrder.save();

        const mailOptions = {
            from: "samiulalimsaad@gmail.com",
            to: order.email,
            subject: "Order purchase successfully",
            html: `<h3>Hi ${order.email},</h3>
                    <p>thank you for purchase The order</p>
                    <p>you paid ${order.price} for ${order.orderName} Quantity ${order.orderQuantity}.</p>
                    <p>Thank You</p>`,
        };

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

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(process.env.DATABASE_URL, {}, () => {
        console.log("Database is connected");
    });
});
