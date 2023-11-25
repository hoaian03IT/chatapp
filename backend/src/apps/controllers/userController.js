import User from "../models/userModel.js";

class Controller {
    // [get] /info
    async getInfo(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: "User is not existed" });
            const { username, avatar, bio } = user._doc;
            res.status(200).json({ message: "Get info successfully!", username, avatar, bio });
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
