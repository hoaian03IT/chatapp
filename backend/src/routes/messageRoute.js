import express from "express";
import { auth } from "../apps/middlewares/auth.js";
import { messageController } from "../apps/controllers/messageController.js";

const messageRoute = express.Router();

messageRoute.get("/v/messages/:id_room", auth, messageController.getMessagesRoom);
messageRoute.post("/v/send-message", auth, messageController.sendMessage);

export { messageRoute };
