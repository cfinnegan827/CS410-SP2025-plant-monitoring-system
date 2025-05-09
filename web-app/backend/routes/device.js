import express from 'express';
import readingModel from '../models/Plants.js';

const router = express.Router();
// a route for sending data to the mongo db acting as middleware between the hardware and database
// it receives the data from the post request sent from the esp
// then it follows the plant schema and send the data to mongo
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