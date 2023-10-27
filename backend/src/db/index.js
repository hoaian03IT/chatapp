import mongoose from "mongoose";

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URL);
    try {
        console.log("DB connection successfully");
    } catch (error) {
        console.log(err.message);
    }
}

export { connectToDB };
