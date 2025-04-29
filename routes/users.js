import express from 'express';
import userModel from '../models/Users.js';

const router = express.Router();

// LOGIN + REGISTRATION
router.post('/register', async (req, res) => {
    try {
        const verificationCode = generateVerificationCode(); // make func later

        const {name, username, email} = req.body;
        const user = new userModel({
            name, 
            username,
            email,
            verificationCode,
            status: 'pending'
        });
        // save the user
        await user.save();

        sendVerificationEmail(user.email, verificationCode);

        res.status(201).json({
            success: true, user})
    } catch (err) {
        if (err.code === 11000) {// error for duplicate
            const field = Object.keys(err.keyPattern)[0]; // should get the error field
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

// VERIFICATION 
router.post('/verify', async(req, res) => {
    const { email, verificationCode, password } = req.body;

    try {

        const user = await userModel.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found.'
            });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({
                success: false,
                message: 'Invalid verification code.'
            });
        }

        // update user password and verification status after it is verified
        user.status = 'verified';
        user.password = password;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Account verified successfully.'
        });
    } catch (err) {
            res.status(500).json({
                success: false,
                error: err.message
            })
    }
})

router.post('/login', (req, res) => {
    // can login in using only username 
    const {username, password} = req.body;
    userModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) res.json("Success");
            else res.json("Incorrect username or password");
        } else res.json("Incorrect username or password");
    })

})



export default router;