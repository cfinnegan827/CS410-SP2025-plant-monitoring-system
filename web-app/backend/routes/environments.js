// environment.js - API routes for environments 
// we did not end up using these, under api branch this does get used and is more simplified and structured 

import express from 'express';
import environmentModel from '../models/Environments.js';

const router = express.Router();

// ADD ENVIRONMENT
// WILL NEED TO CHANGE SINCE WE NEED TO CONNECT AN ESP FOR 
// READINGS

/*
 * @route POST /api/evironments/add-environment
 * @desc POST route to create a new environment
 */
router.post('/add-environment', async (req, res) => {
    try {
        const {
            environment_name,
            user_id, 
            // not sure if we should get any current readings
            // current_temp,
            // current_humidity,
            environment_conditions
        } = req.body;

        // const parsedCurrTemp = parseInt(current_temp);
        // const parsedCurrHumidity = parseInt(current_humidity);

        const parsedConditions = {
            min_humidity_lvl: parseInt(environment_conditions.min_humidity_lvl),
            max_humidity_lvl: parseInt(environment_conditions.max_humidity_lvl),
            min_temp: parseInt(environment_conditions.min_temp_lvl),
            max_temp: parseInt(environment_conditions.max_temp_lvl)
        };

        await environment.save();

        res.status(201).json({
            success: true,
            message: 'Environment created successfully',
            environment
        });

    } catch (err) {
        res.status(500).json({
            success: false, 
            message: 'Failed to create environment',
            error: err.message
        });

    }

})


/*
 * @route POST /api/environments/add-group/:envId
 * @desc POST route for adding a gorup of like plants 
 * i.e adding 10 broccoli to the greenhouse 
 */
router.post('/add-group/:envId', async (req, res) => {

    const { envId } = req.params;
    const { groupName, plant_id, quantity } = req.body;

    try {
        const environment = await environmentModel.findById(envId);

        if (!environment) {
            return res.status(404).json({
                success: false, 
                message: 'Environment not found'
            })
        }

        // adds an new group to the inventory
        environment.environment_inventory.set(groupName, {
            plant_id,
            quantity
        })

        // add the environment
        await environment.save();

        res.status(201).json({
            success: true,
            message: `Group '${groupName}' is added/updated successfully`,
            environment
        })
    } catch (err) {
        res.status(500).json({ 
        success: false,
        error: err.message
        }); 
    }
    
});

// GET CURRENT READING + UPDATE READINGS ARRAY
/*
 * @route PATCH /api/environments/add-group/:envId
 * @desc PATCH route updating current readings and adding readings to historical data schema readings
 * i think I was builfing routes for a software that is not feasable with our timeframe but if we had more time
 * logic like this or similar would have been used
 */
router.patch('/environment/:envId/get-readings', async (req, res) => {
    const { envId } = req.params;
    const { temp, humidity } = req.body;

    const parsedTemp = parseInt(temp);
    const parsedHumidity = parseInt(humidity);

    try {
        const environment = await environmentModel.findById(envId);
        if (!environment) {
            return res.status(400).json({
                success: false,
                message: 'Environment not found'
            });
        }

        // update current readings 
        environment.current_humidity = parsedHumidity;
        environment.current_temp = parsedTemp;

        // add the data to historical readings
        environment.readings.push({
            temp: parsedTemp,
            humidity: parsedHumidity
        });

        await environment.save();

        res.status(200).json({
            success: true,
            message: 'Readings updated and logged',
            environment
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

// VERIFICATION 
// was supposed to be used to verify users, this does not belong here and was never used
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




export default router;
