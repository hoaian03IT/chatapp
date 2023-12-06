import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/index.js";
import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js";
import bcrypt from "bcrypt";

class Controller {
    // [post] /login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const userLogin = await User.findOne({ email: email }).exec();
            if (!userLogin) return res.status(403).json({ message: "Email or password is wrong" });

            const isValidPw = await bcrypt.compare(password, userLogin.password);
            if (!isValidPw) return res.status(403).json({ message: "Email or password is wrong" });

            // create access token and refresh token
            const accessToken = generateAccessToken(userLogin);
            const refreshToken = generateRefreshToken(userLogin);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
                expires: new Date(Date.now() + 30 * 24 * 3600000),
            });

            // save refresh token
            await RefreshToken.create({ _userId: userLogin._id, token: refreshToken });

            const { password: pwd, ...others } = userLogin._doc;

            res.status(200).json({
                message: "Login successfully",
                ...others,
                token: accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
    // [post] /register
    async register(req, res) {
        try {
            const saltRounds = 10;
            const maxLengthUsername = 30;
            const { email, username, password } = req.body;

            if (!username || username.indexOf(" ") >= 0) return res.status(403).json({ message: "Username is wrong" });

            const hasExistedEmail = await User.findOne({ email }).exec();
            if (hasExistedEmail) return res.status(403).json({ message: "Email is existed" });

            const hasExistedUsername = await User.findOne({ username }).exec();
            if (hasExistedUsername) return res.status(403).json({ message: "Username is existed" });

            if (username.length > maxLengthUsername)
                return res.status(403).json({ message: `Username has maximum ${maxLengthUsername} letters` });

            const hashPassword = await bcrypt.hash(password, saltRounds);
            const newUser = await User.create({ email, password: hashPassword, username });

            // create access token and refresh token
            const accessToken = generateAccessToken(newUser);
            const refreshToken = generateRefreshToken(newUser);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
                expires: new Date(Date.now() + 30 * 24 * 3600000), // 30 days
            });

            // save refresh token
            await RefreshToken.create({ _userId: newUser._id, token: refreshToken });

            const { password: pwd, ...others } = newUser._doc;

            res.status(200).json({ message: "Register successfully", ...others, token: accessToken });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    // [get] /refresh
    async requestRefreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(401).json({ message: "Unauthenticated" });

            const isValidRefreshToken = await RefreshToken.findOne({ token: refreshToken });
            if (!isValidRefreshToken) return res.status(403).json({ message: "Refresh token is not valid!" });

            jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(403).json({ message: "Have errors in verifying token" });
                }

                // create new access token & refresh token
                const newAccessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);

                await RefreshToken.deleteOne({ token: refreshToken }); // delete old refresh token
                await RefreshToken.create({ _userId: user.id, token: newRefreshToken }); // create new refresh token

                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: "/",
                    sameSite: "strict",
                    expires: new Date(Date.now() + 30 * 24 * 3600000), // 30 days
                });

                res.status(200).json({ token: newAccessToken });
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    // [post] /v/logout
    async logout(req, res) {
        try {
            await RefreshToken.deleteOne({ token: req.cookies["refreshToken"] });
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    async deleteAllToken(req, res) {
        try {
            await RefreshToken.deleteMany();
            res.status(200).json({ message: "Revoke successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
}

const authController = new Controller();
export { authController };
