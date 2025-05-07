import express from 'express';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import environmentRoutes from './routes/environments.js';
import bodyParser from 'body-parser';
import userModel from './models/Users.js';
// import environmentModel from './models/Environments.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json());
// Route imports 
app.use('/posts', postRoutes);
app.use('/environments', environmentRoutes);

// ROUTES 
app.get('/', (req, res) => {
    res.send('server is working');
});




// Connection to DB
mongoose.connect(MONGO_URL).then(async () => {
    console.log("DB is connected");

    try {
        await userModel.syncIndexes();
        console.log("Indexes synced successfully.");
    } catch (err) {
        console.log("Error syncing indexes:", err.message);
    }
    app.listen(PORT, ()=> {
        console.log(`server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
    console.log('could not connect');
});

// cron.schedule('*/15 * * *', async () => {
//     try {
//         const environments = await environmentModel.find();

//         for (const env of environments) {
//             if (env.current_temp && env.current_humidity) {
//                 env.readings.push({
//                     temp: env.current_temp,
//                     humidity: env.current_humidity
//                 });
//                 await env.save();
//             }
//         }
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             error: err.message
//         })
//     }
// })