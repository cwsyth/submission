const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// for testing purposes
userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        
        if(users) {
            res.json(users);
        }
        else {
            res.status(404).end();
        }
    }
    catch(err) {
        next(err);
    }
});

userRouter.post('/', async (req, res, next) => {
    try {
        const { password } = req.body;

        if(password.length < 8) {
            throw {
                name: 'ValidationError',
                message: 'password must be at least 8 characters long'
            };
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            ...req.body,
            passwordHash
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err) {
        next(err);
    }
});

module.exports = userRouter;