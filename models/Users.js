import mongoose from "mongoose";
import {generateVerificationCode} from '../utils/emailTools.js';
import bcrypt from 'bcryptjs';

const verificationCode = generateVerificationCode();
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
        expires: 900 // will make mongo delete the document after 15 minutes
    },
    verificationCode: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        enum: ['pending', 'verified'], // allowed values
        default: 'pending'
    }
});

userSchema.pre('save', async (params) =>{
    // will only hash if pass is modified 
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// create the model
// Time-to-live TTL only applies to status: pending
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900, partialFilterExpression: { status: 'pending' } });

const userModel = mongoose.model("users", userSchema);
export default userModel;