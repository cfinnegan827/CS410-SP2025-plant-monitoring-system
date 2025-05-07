import express from 'express';
import deviceModel from '../models/Device.js';
import readingModel from '../models/Readings.js';

const router = express.Router();

router.post('/devices/register', async (req, res) => {
    const { name, device_id } = req.body;

    try {
        const existing = await deviceModel.findOne({ device_id });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'This device has already been registered'
            })
        }

        const device = await deviceModel.create({ name, device_id });
        res.status(201).json({
            success: true,
            device
        })

    } catch (err) {
        return res.status(500).json({
            success: false, 
            error: err.message
        })
    }
})

router.post('/devices/data', async (req, res) => {
    const { device_id, temp, humidity } = req.body;

    try {
        const device = await deviceModel.findOne({ device_id });
        if (!device) {
            return res.status(404).json({
                success: false,
                message: 'Device not registered'
            })
        }

        const readings = await readingModel.create({
            device_id: device_id,
            environment_id: device.environment_id || null,
            temp,
            humidity
        })

        res.status(200).json({
            success: true,
            readings
        })

    } catch (err) {

    }
})

router.patch('/devices/:deviceId/assign-environment', async (req, res) => {
    const { deviceId } = req.params;
    const { environment_id } = req.body;

    try {


        const device = await deviceModel.findByIdAndUpdate( 
            deviceId,
            { environment_id },
            { new: true } // returns updated document instead of original
        );
        res.status(200).json({
            success: true,
            message: 'Environment assigned to device',
            device
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


export default router;