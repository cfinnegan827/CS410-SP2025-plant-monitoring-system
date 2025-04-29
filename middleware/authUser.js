import jwt from 'jsonwebtoken';
import userModel from '../models/Users';
import dotenv from 'dotenv';

dotenv.config();

export async function authenticateUser (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized: No token provided"
        })
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attacht to user object exclude the password
        req.user = await userModel.findById(decoded.id)
        .select("-password");

        if (!req.user) {
            res.status(401).jsoon({
                success: false,
                message: "Unauthorized: User not found"
            })
        }
        next(); // after we auth the user we can now do stuff
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid token"
        })
    }

}