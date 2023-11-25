import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
    {
        content: { type: String, required: true },
        room: { type: Schema.Types.ObjectId, ref: "Room" },
        sender: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
