import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import http from "http";

import { connectToDB } from "./src/db/index.js";
import { route } from "./src/routes/index.js";
import { socket } from "./src/socket.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

// connect to db
connectToDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));

route(app);

// socket.io
const server = http.createServer(app);
socket(server);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
