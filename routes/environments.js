import express from 'express';
import environmentModel from '../models/Environments.js';
import readingModel from '../models/Readings.js';
import { authDevice } from '../middleware/authDevice.js';

const router = express.Router();

// ADD ENVIRONMENT
// WILL NEED TO CHANGE SINCE WE NEED TO CONNECT AN ESP FOR 
// READINGS
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
router.post('/environment/:envId/readings', authDevice, async (req, res) => {
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
        await environment.save();

        // add the data to historical readings
        const reading = new readingModel({
            environment_id: envId,
            temp: parsedTemp,
            humidity: parsedHumidity
        });
        await reading.save();

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
// sorted newest first
// QUERY READINGS OF AN ENVIRONMENT (for data visuals)
router.get('/environment/:envId/readings', async (req, res) => {
    try {
        const readings = await readingModel.find({
            environment_id: req.params.envId
        }).sort({ timestamp: -1 }).limit(100);
        res.status(200).json({
            success: true,
            readings
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
})

// sorted newest date first 
// QUERY READINGS OF AN ENVIRONMENT LAST 24HRS (for data visuals)
router.get('/environment/:envId/readings', async (req, res) => {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 3600 * 1000);
        const readings = await readingModel.find({
            environment_id: req.params.envId,
            timestamp: { $gte: oneDayAgo}
        }).sort({ timestamp: -1 }).limit(100);
        res.status(200).json({
            success: true,
            readings
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
})

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