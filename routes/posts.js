import express from 'express';
import userModel from '../models/Users.js';

const router = express.Router();

router.post('/register', (req, res) => {
    userModel.create({
        //test
        "name": "Jim Hefferon",
        "username": "Jim",
        "email": "jim123@gmaa.com",
        "password": "password1"
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
    console.log('post route and user created hahahahah');
});


export default router;