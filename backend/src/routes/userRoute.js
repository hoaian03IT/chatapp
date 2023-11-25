import express from "express";
import { userController } from "../apps/controllers/userController.js";
import { auth } from "../apps/middlewares/auth.js";
const userRouter = express.Router();

userRouter.get("/info/:id", userController.getInfo);
userRouter.get("/search", userController.findUser);
userRouter.post("/v/update-profile", auth, userController.updateProfile);
userRouter.delete("/destroy-all-user", userController.destroyAllUser);

export { userRouter };
