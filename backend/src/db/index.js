const mongoose = require("mongoose");

async function connectToDB() {
    mongoose.connect(process.env.MONGO_URL);
    try {
        console.log("DB connection successfully");
    } catch (error) {
        console.log(err.message);
    }
}

module.exports = { connectToDB };
