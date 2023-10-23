import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        avatar: { type: String, default: null },
        bio: { type: String, default: "" },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
