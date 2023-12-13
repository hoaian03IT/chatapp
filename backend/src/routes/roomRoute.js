import express from "express";
import { auth } from "../apps/middlewares/auth.js";
import { roomController } from "../apps/controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/v/create", auth, roomController.createRoom);
roomRouter.post("/v/update-room", auth, roomController.updateRoom);
roomRouter.get("/v/get-rooms", auth, roomController.getRooms);
roomRouter.get("/v/list-member/:id_room", auth, roomController.fetchMembers);
roomRouter.get("/v/get-one-room/:id_room", auth, roomController.fetchOneRoom);
roomRouter.post("/v/leave-room", auth, roomController.leaveRoom);
roomRouter.delete("/clear-all", roomController.clearAll);

export { roomRouter };
