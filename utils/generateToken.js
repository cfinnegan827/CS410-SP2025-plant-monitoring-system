import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export function generateUserToken (user) {
    return jwt.sign(
        {id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '90d'} // sessions expire after 90 days
    );
}

export function generateDeviceToken () {
    return crypto.randomBytes(24).toString("hex");
}