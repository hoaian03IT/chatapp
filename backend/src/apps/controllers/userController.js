import mongoose from "mongoose";
import User from "../models/userModel.js";

class Controller {
    // [get] /info
    async getInfo(req, res) {
        try {
            const id = req.params.id;
            const { _id: userId } = req.user;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User is not existed" });
            const { friends } = await User.findById(userId).select("friends");
            const isFriend = friends.includes(new mongoose.Types.ObjectId(id));
            const { username, avatar, bio, _id } = user._doc;
            res.status(200).json({ message: "Get info successfully!", username, avatar, bio, _id, isFriend });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    // [post] /v/update-profile
    async updateProfile(req, res) {
        try {
            const { _id } = req.user;
            const { avatar, bio } = req.body;
            const user = await User.findByIdAndUpdate(_id, { avatar: avatar, bio: bio }).exec();
            const { password, ...others } = user._doc;
            res.status(200).json({ message: "Updated profile successfully!", ...others });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    // [get] /search
    async findUser(req, res) {
        try {
            const { q } = req.query;
            const users = await User.find({
                username: {
                    $regex: q,
                },
            }).select("_id username avatar");
            res.status(200).json({ users });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    async addFriend(req, res) {
        try {
            const { id } = req.body;
            const { _id: userId } = req.user;
            const hasExisted = await User.findById(id);
            if (!hasExisted) return res.status(400).json({ message: "User has not existed" });
            let { friends } = await User.findById(userId).select("friends");
            if (!friends.includes(hasExisted._id)) {
                friends.push(hasExisted._id);
                await User.findByIdAndUpdate(userId, { friends });
            }

            res.status(200).json({ message: "Add friend successful" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async unfriend(req, res) {
        try {
            const { id } = req.body;
            const { _id: userId } = req.user;
            if (id === userId) return res.status(400).json({ message: "You cannot unfriend yourself" });
            let { friends } = await User.findById(userId);
            const idObject = new mongoose.Types.ObjectId(id);
            friends = friends.filter((idFriends) => {
                return !idFriends.equals(idObject);
            });
            await User.findByIdAndUpdate(userId, { friends });
            res.status(200).json({ message: "Unfriend successful" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // [delete] /destroy-all-user
    async destroyAllUser(req, res) {
        try {
            await User.deleteMany();
            res.status(200).json({ message: "Destroy successfully" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }
}

const userController = new Controller();
export { userController };
