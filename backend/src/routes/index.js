import { authRouter } from "./authRoute.js";
import { messageRoute } from "./messageRoute.js";
import { roomRouter } from "./roomRoute.js";
import { userRouter } from "./userRoute.js";

export const route = (app) => {
    app.use("/auth", authRouter);
    app.use("/room", roomRouter);
    app.use("/user", userRouter);
    app.use("/message", messageRoute);
};
