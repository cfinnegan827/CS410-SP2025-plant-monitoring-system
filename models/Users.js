import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});


const userModel = mongoose.model("users", userSchema);
export default userModel;