import * as dotenv from "dotenv";
import * as express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.json({ message: "hello" });
});

app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    mongoose.connect(process.env.DATABASE_URL, {}, () => {
        console.log("Database is connected");
    });
});
