const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

userRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash
    });

    try {
        const result = await user.save();
        res.status(201).json(result);
    }
    catch(err) {
        next(err);
    }
});

module.exports = userRouter;