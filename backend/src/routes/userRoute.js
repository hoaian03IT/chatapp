import express from "express";
import { userController } from "../apps/controllers/userController.js";
import { auth } from "../apps/middlewares/auth.js";
const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.post("/refresh", userController.requestRefreshToken);
userRouter.get("/info", auth, userController.getInfo);
userRouter.post("/logout", auth, userController.logout);
userRouter.delete("/revoke-all-tokens", userController.deleteAllToken);

export { userRouter };
