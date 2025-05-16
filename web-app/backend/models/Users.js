// Users.js - Mongoose model for registered devices 
import mongoose from "mongoose";

/*
@desc basic schema for user information
was very ambitous and wanted to include an email verification that will delete the record from mongo if the status 
is not changed from pending to verified
We ended up scraping/ pausing this until we can get the essentials done.. under api branch it maybe done and working with a newer UI
*/

// Removed generateVerificationCode import since it's no longer needed

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    // Made verificationCode optional since we're not using it now
    verificationCode: {
        type: String,
        required: false // Optional now
    },
    status: {
        type: String, 
        enum: ['pending', 'verified'], // Allowed values
        default: 'verified' // Directly set status to 'verified'
    }
});

// Create the model
userSchema.index({ createdAt: 1 }, { partialFilterExpression: { status: 'pending' } });

const userModel = mongoose.model("users", userSchema);
export default userModel;
