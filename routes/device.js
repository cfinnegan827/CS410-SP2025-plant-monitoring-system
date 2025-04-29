import express from 'express';
import deviceModel from '../models/Device.js';
import { authenticateUser } from '../middleware/authUser.js';

const router = express.Router();

router.post('/register-device', authenticateUser, async (req, res) => {

})


export default router;