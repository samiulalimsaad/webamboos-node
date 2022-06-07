import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";
import * as nodemailer from "nodemailer";
import { Product } from "./Model/Product.model";
import { productValidationSchema } from "./Validation/Product.validate";

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

app.get("/products", async (req: express.Request, res: express.Response) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            message: "All products",
            success: true.valueOf,
            products,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

app.get(
    "/products/:id",
    async (req: express.Request, res: express.Response) => {
        try {
            const product = await Product.findById(req.params.id);

            res.status(200).json({
                message: "products",
                success: true.valueOf,
                product,
            });
        } catch (error) {
            res.json({ message: error.message });
        }
    }
);

app.post("/product", async (req: express.Request, res: express.Response) => {
    try {
        const data = await productValidationSchema.validate(req.body, {
            abortEarly: false,
        });

        data.status = "Inserted";

        const newProduct = new Product(data);

        const product = await newProduct.save();

        const mailOptions = {
            from: "samiulalimsaad@gmail.com",
            to: product.email,
            subject: "Product purchase successfully",
            html: `<h3>Hi ${product.email},</h3>
                    <p>thank you for purchase The product</p>
                    <p>you paid ${product.price} for ${product.productName}.</p>
                    <p>Thank You</p>`,
        };

        await transporter
            .sendMail(mailOptions)
            .then((res) => console.log("Successfully sent"))
            .catch((err) => console.log("Failed ", err));

        res.status(200).json({ message: "Inserted", success: true, product });
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
