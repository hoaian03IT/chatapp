import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectToDB } from "./src/db/index.js";
import { route } from "./src/routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT;
const app = express();

// connect to db
connectToDB();

app.use(express.static(path.resolve("./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
