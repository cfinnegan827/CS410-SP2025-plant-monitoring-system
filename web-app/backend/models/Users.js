import mongoose from "mongoose";
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
        expires: 900 // Mongo will delete document after 15 minutes
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
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900, partialFilterExpression: { status: 'pending' } });

const userModel = mongoose.model("users", userSchema);
export default userModel;
