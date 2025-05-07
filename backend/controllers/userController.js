import jwt from 'jsonwebtoken'
import userModel from '../models/Users.js';

const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        { expiresIn: '7d'} // sessions expire after 90 days
    );
}

// registor User 
export const registerUser = async (req, res) => {
    

    try {
        const { name, email, password, profileImageUrl } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = new userModel({
            name, 
            email,
            password,
            profileImageUrl
        });
        // save the user
        
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.status(400).json({
                message: "Email is already in use, try resetting password"
            })
        }

        await user.save();


        res.status(201).json({
            success: true,
            id: user._id,
            user,
            token: generateToken(user._id)})

    } catch (err) { 
        res.status(500).json({ 
        success: false,
        error: err.message
        });   

    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user || !(await user.comparePassword(password))) {
            return res.staus(400).json({
                message: "Invalid credentials"
            })
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })

    } catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message
        }); 
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password") // does not include password

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}
