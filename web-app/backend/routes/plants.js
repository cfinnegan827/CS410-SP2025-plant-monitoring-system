// routes/Plant.js

import express from 'express';
import plantModel from '../models/Plants.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// CREATE a new plant reading
router.post('/', async (req, res) => {
    try {
        const { email, light, temperature, soilMoisture, humidity } = req.body;

        if (!email || light == null || temperature == null || soilMoisture == null || humidity == null) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const reading = new plantModel({
            email,
            light,
            temperature,
            soilMoisture,
            humidity
        });

        await reading.save();

        res.status(201).json({
            success: true,
            message: "Plant reading saved successfully",
            reading
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to save reading",
            error: err.message
        });
    }
});

// GET all plant readings for an email
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const readings = await plantModel.find({ email }).sort({ timestamp: -1 });

        res.status(200).json({
            success: true,
            readings
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch readings",
            error: err.message
        });
    }
});

export default router;
