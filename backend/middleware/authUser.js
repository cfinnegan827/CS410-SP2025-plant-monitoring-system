import jwt from 'jsonwebtoken';
import userModel from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

export async function protect(req, res, next) {
    let token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(401).json({
        success: false,
        message: "Not authorized, no token"
    })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await userModel.findById(decoded.id).select('-password')
        next()
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        })
    }
}
