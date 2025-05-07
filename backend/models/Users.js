import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// const verificationCode = generateVerificationCode();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
    profileImageUrl: {
        type: String,
        default: null
    },
    
}, { timestamps: true }
);

// hash password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // ← this must be defined
  
    // hash password or any other logic
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

// compare pass
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const userModel = mongoose.model("users", userSchema);
export default userModel;