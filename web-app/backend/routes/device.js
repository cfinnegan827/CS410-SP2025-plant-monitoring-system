// device.js - API routes for readings

/*
@desc 
I do not believe we ended up using this but used something very similar
this was supposed to be the route used by the esp to post data to mongo 
and get that data from the db to display in the frontend

If we continued with this project we probably would scrap the other apir routes and use this 
or a adapted version of this
*/

import express from 'express';
import readingModel from '../models/Plants.js';

const router = express.Router();

// a route for sending data to the mongo db acting as middleware between the hardware and database
// it receives the data from the post request sent from the esp
// then it follows the plant schema and send the data to mongo

/*
 * @route POST /api/devices/data
 * @desc POST readings from esp to mongoDB
 */
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
