import express from 'express';
import deviceModel from '../models/Device.js';
import readingModel from '../models/Readings.js';

const router = express.Router();

router.post('/devices/data', async (req, res) => {
    const { email, light, temperature, soilMoisture, humidity } = req.body;

    try {
        const readings = await readingModel.create({
            email,
            light,
            temperature,
            soilMoisture,
            humidity
        })

        res.status(200).json({
            success: true,
            readings
        })

    } catch (err) {

    }
})

export default router;