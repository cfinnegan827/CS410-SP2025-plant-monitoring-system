import express from 'express';
import { protect } from '../middleware/authUser.js'
import {registerUser, loginUser, getUserInfo} from '../controllers/userController.js'
import upload from '../middleware/upload.js';

const router = express.Router();

// LOGIN + REGISTRATION + USER
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUser', protect, getUserInfo)

router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No such file upload"
        })
    } 
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    res.status(200).json({
        imageUrl
    })
})
export default router;