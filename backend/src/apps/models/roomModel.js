import mongoose from "mongoose";
import defaultRoomPic from "../../assets/picroom_default.png";
const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        // id: Schema.Types.ObjectId,
        nameRoom: { type: String, required: true },
        picRoom: { type: String, default: defaultRoomPic },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
