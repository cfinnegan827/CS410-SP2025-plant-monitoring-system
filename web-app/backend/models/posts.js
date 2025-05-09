// this is just an example
// Posts.js - Mongoose model for registered devices 

/*
if we did end up getting around to building the community/social media side of our software this would be used and more developed
but for now it is just an example that I learned from youtube on how to make mongoose schema
*/
import mongoose from 'mongoose';
// can add other propertis than just type
// such as the length, etc etc
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: Date.now
});

const postsModel = mongoose.model("posts", userSchema);
