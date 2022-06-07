import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";
import { Product } from "./Model/Product.model";
import { productValidationSchema } from "./Validation/Product.validate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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

app.post("/product", async (req: express.Request, res: express.Response) => {
    try {
        const data = await productValidationSchema.validate(req.body, {
            abortEarly: false,
        });

        data.status = "Inserted";

        const newProduct = new Product(data);

        const product = await newProduct.save();

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
