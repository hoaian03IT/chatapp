import mongoose from "mongoose";

import Room from "../models/roomModel.js";
import RoomParticipant from "../models/roomParticipantModel.js";
import Message from "../models/messageModel.js";

async function destroyRoom(idRoom) {
    try {
        await Room.findByIdAndDelete(new mongoose.Types.ObjectId(idRoom));
        await Message.deleteMany({ room: new mongoose.Types.ObjectId(idRoom) });
    } catch (error) {}
}

class Controller {
    // [post] /v/create
    async createRoom(req, res) {
        try {
            const { _id, username } = req.user;
            let { addedUsers } = req.body;

            if (!addedUsers) return res.status(400).json({ message: "Cannot create room" });

            addedUsers = [...addedUsers, { _id, username }];

            const nameRoom = addedUsers.reduce((acc, curr) => acc + curr.username + ", ", "");

            const newRoom = await Room.create({ nameRoom: nameRoom, lastMessage: "Room is created" });

            addedUsers = addedUsers.map((user) => ({
                user: user._id,
                room: newRoom._id,
            }));

            await RoomParticipant.insertMany(addedUsers);

            res.status(200).json({ message: "Room is created", ...newRoom._doc });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error.message });
        }
    }

    // [get] /v/getRooms
    async getRooms(req, res) {
        try {
            const { _id } = req.user;
            const response = await RoomParticipant.aggregate([
                { $match: { user: new mongoose.Types.ObjectId(_id) } },
                {
                    $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user-info" },
                },
                { $lookup: { from: "rooms", localField: "room", foreignField: "_id", as: "room-info" } },
            ]);

            const rooms = response
                .map((item) => {
                    const [room] = item["room-info"];
                    return room;
                })
                .sort((a, b) => {
                    return b.updatedAt - a.updatedAt;
                });

            res.status(200).json({ rooms });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async fetchOneRoom(req, res) {
        try {
            const { id_room } = req.params;
            const room = await Room.findById(id_room);
            res.status(200).json({ ...room._doc });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // [get] /v/list-member/:id_room
    async fetchMembers(req, res) {
        try {
            const { _id } = req.user;
            const { id_room } = req.params;
            const hasUserInRoom = await RoomParticipant.findOne({ user: _id, room: id_room });
            if (!hasUserInRoom) return res.status(403).json({ message: "You have not joined this room" });

            let participants = await RoomParticipant.aggregate([
                { $match: { room: new mongoose.Types.ObjectId(id_room) } },
                { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user-info" } },
            ]);

            participants = participants.map((participant) => {
                const [info] = participant["user-info"];
                const { username, avatar } = info;
                return { username, avatar };
            });

            res.status(200).json({ participants });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async leaveRoom(req, res) {
        try {
            const { idRoom } = req.body;
            const { _id: idUser } = req.user;

            if (!idRoom || !idUser) return res.status(400).json({ message: "Something wrong happened" });

            const response = await RoomParticipant.findOneAndDelete({
                room: new mongoose.Types.ObjectId(idRoom),
                user: new mongoose.Types.ObjectId(idUser),
            });

            if (response) res.status(200).json({ message: "Leave room successful!" });
            else res.status(400).json({ message: "Something wrong happened" });

            // clear room if no one in room
            const hasAnyOne = await RoomParticipant.find({ room: new mongoose.Types.ObjectId(idRoom) });

            if (hasAnyOne.length === 0) {
                await destroyRoom(idRoom);
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async clearAll(req, res) {
        try {
            await Room.deleteMany();
            await RoomParticipant.deleteMany();
            res.status(200).send("Cleared");
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

const roomController = new Controller();
export { roomController };
