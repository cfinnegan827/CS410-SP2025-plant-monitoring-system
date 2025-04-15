// this is just an example

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