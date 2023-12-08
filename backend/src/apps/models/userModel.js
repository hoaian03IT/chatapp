import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        avatar: {
            type: String,
            default: "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
        },
        bio: { type: String, default: "" },
        password: { type: String, required: true },
        friends: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
