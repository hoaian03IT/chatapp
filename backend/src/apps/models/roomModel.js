import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        owner: { type: Schema.Types.ObjectId, ref: "User" },
        nameRoom: { type: String, required: true },
        picRoom: {
            type: String,
            default: "https://kmpplus.com/wp-content/uploads/2018/08/Cafebord-2-COLOURBOX23980354-1024x1024-1.jpg",
        },
        lastMessage: { type: String },
        lastSender: { type: String },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
