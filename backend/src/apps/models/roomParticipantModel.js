import mongoose from "mongoose";
const { Schema } = mongoose;

const roomParticipantSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        room: { type: Schema.Types.ObjectId, ref: "Room" },
    },
    { timestamps: true }
);

const RoomParticipant = mongoose.model("RoomParticipant", roomParticipantSchema);

export default RoomParticipant;
