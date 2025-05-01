import express from 'express';

const router = express.Router();
router.post('/data', async(req, res) =>{
    try{
        const {temperature, humidity, soil_moisture, light_intensity} = req.body;
        const newData = new SensorData({temperature, humidity, soil_moisture, light_intensity});
        await newData.save();
        res.status(201).send('Data saved to MongoDB!');
    } catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }
});


export default router;