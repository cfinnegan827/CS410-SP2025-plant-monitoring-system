/*
this was never used 
this was more of a test for when I was learning routes 
should disregard this file
*/

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
    // can login in using email or username 
    const {username, password} = req.body;
    userModel.findOne({username:username})
    .then(user => {
        if (user) {
            if (user.password === password) res.json("Success");
            else res.json("Incorrect username or password");
        } else res.json("Incorrect username or password");
    })

})

// ENVIRONMENT SETUP
// router.post('add-plants', async (req, res) => {
//     const {user_id, {
        
//     }} = req.body;
    
//     try {
//         const updatedEnvironment = await 
//     }
// })

//


// to get a specific post 
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json( {message: err});
    }
    
})

// DELETE A POST 
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch (err) {
        res.json( {message: err});
    }
    
})

export default router;
