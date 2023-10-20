const express = require("express");
const app = express();
require("dotenv").config();
const { connectToDB } = require("./src/db");

const port = process.env.PORT;

// connect to db
connectToDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
