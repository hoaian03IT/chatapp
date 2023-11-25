import mongoose from "mongoose";
import RoomParticipant from "../models/roomParticipantModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";

class Controller {
    // [get] /v/messages/:id_room
    async getMessagesRoom(req, res) {
        try {
            const { _id } = req.user;
            const { id_room } = req.params;
            const hasUserInRoom = await RoomParticipant.findOne({ user: _id, room: id_room });
            if (!hasUserInRoom) return res.status(403).json({ message: "You have not joined this room" });

            const messages = await Message.aggregate([
                { $match: { room: new mongoose.Types.ObjectId(id_room) } },
                {
                    $lookup: { from: "users", localField: "sender", foreignField: "_id", as: "detailSender" },
                },
                {
                    $unwind: "$detailSender",
                    // $unwind: $<field>: it will return an array if dont use $unwind
                },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        "detailSender._id": 1,
                        "detailSender.username": 1,
                        "detailSender.avatar": 1,
                    },
                },
            ]).limit(50);

            res.status(200).json({ _id: id_room, messages });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // [post] /v/send-message
    async sendMessage(req, res) {
        try {
            const { _id } = req.user;
            const { room, sender, content } = req.body;
            const message = await Message.create({
                room: new mongoose.Types.ObjectId(room),
                sender: new mongoose.Types.ObjectId(sender),
                content,
            });
            const user = await User.findById(_id);

            const { _id: _idM, content: contentM } = message._doc;
            const { _id: _idU, username: usernameU, avatar: avatarU } = user._doc;

            res.status(200).json({
                _id: _idM,
                content: contentM,
                detailSender: { _id: _idU, username: usernameU, avatar: avatarU },
            });

            await Room.findByIdAndUpdate(room, {
                lastMessage: content,
                lastSender: usernameU,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

const messageController = new Controller();
export { messageController };
