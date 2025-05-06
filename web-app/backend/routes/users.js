import express from 'express';
import userModel from '../models/Users.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const user = new userModel({
            name,
            username,
            email,
            password,
            status: 'verified'
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            if (field === "email") {
                res.status(400).json({
                    success: false,
                    message: `An account already has that ${field} in use. Try resetting your password`
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: `The ${field} '${req.body[field]}' is already taken. Please choose a different ${field}.`
                });
            }
        } else {
            res.status(500).json({
                success: false,
                error: err.message
            });
        }
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Incorrect username or password"
            });
        }

        // Create JWT token

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: err.message
        });
    }
});

export default router;
