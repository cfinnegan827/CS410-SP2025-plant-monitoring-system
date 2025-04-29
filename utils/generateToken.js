import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function generateUserToken (userId) {
    return jwt.sign({

    });
}

export function generateDeviceToken () {
    return crypto.randomBytes(24).toString("hex");
}