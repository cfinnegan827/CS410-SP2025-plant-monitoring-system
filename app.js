import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.json());
// Route imports 
app.use('/posts', postRoutes);

// ROUTES 
app.get('/', (req, res) => {
    res.send('server is working');
});




// Connection to DB
mongoose.connect(MONGO_URL).then(() => {
    console.log("DB is connected");
    app.listen(PORT, ()=> {
        console.log(`server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
    console.log('could not connect');
})

// DB SCHEMAS 

// const userSchema = new mongoose.Schema({
//     name: String,
//     username: String,
//     password_hashed: String,
//     phone_number: String,
// });

// const userModel = mongoose.model("users", userSchema);