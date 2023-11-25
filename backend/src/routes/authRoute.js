import express from "express";
import { authController } from "../apps/controllers/authController.js";
import { auth } from "../apps/middlewares/auth.js";
const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.get("/refresh", authController.requestRefreshToken);
authRouter.post("/v/logout", auth, authController.logout);
authRouter.delete("/revoke-all-tokens", authController.deleteAllToken);

export { authRouter };
