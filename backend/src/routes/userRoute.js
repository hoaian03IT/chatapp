import express from "express";
import { userController } from "../apps/controllers/userController.js";
import { auth } from "../apps/middlewares/auth.js";
const userRouter = express.Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.get("/refresh", userController.requestRefreshToken);
userRouter.get("/auth/info", auth, userController.getInfo);
userRouter.post("/auth/logout", auth, userController.logout);
userRouter.post("/auth/update-profile", auth, userController.updateProfile);
userRouter.delete("/revoke-all-tokens", userController.deleteAllToken);
userRouter.delete("/destroy-all-user", userController.destroyAllUser);

export { userRouter };
