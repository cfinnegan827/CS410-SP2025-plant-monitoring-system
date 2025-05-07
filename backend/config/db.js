import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("MongDB connected.");
    } catch (err) {
        console.log("Error connecting to mongoDB", err.message);
        process.exit(1);
    }
}
