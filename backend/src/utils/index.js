import jwt from "jsonwebtoken";

export const generateAccessToken = (user) =>
    jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: 1000 * 60 * 5, // 5 minutes
    });

export const generateRefreshToken = (user) =>
    jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET_REFRESH_TOKEN, {
        expiresIn: "30d",
    });
