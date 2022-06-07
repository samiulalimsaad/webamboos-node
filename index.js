import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({ message: "hello" });
});

app.get("/about", (req, res) => {
    res.json({ message: "about page working" });
});

app.listen(PORT, () => console.log("server is running"));
