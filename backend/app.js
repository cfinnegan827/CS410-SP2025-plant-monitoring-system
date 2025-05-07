import express from 'express';
// import mongoose from 'mongoose';
//import cron from 'node-cron';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/users.js';
// import environmentRoutes from './routes/environments.js';
// import bodyParser from 'body-parser';
//import userModel from './models/Users.js';
import {connectDB} from './config/db.js';

import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// import environmentModel from './models/Environments.js';

const app = express();
dotenv.config();

// const MONGO_URL = process.env.MONGO_URL;

// Middlewares to handle req headers and body
app.use(express.json());
app.use('/ap1/v1/auth', userRoutes);
//app.use('/environments', environmentRoutes);

// Middlewares to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// Serve uploads to folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

connectDB();
// Connection to DB
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
        console.log(`server is running on port ${PORT}`);
    });