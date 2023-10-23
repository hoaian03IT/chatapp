import { userRouter } from "./userRoute.js";

export const route = (app) => {
    app.use("/user", userRouter);
};
