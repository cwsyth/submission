const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        const hashCompare = await bcrypt.compare(password, user.passwordHash);
        
        if((!hashCompare) || (user === null)) {
            res.status(401).json({
                error: 'invalid username or password'
            });
        }

        const userInfo = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(
            userInfo,
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 }
        );

        res.status(200).send({
            token,
            username: user.username,
            name: user.name
        });
    }
    catch(err) {
        next(err);
    }
});

module.exports = loginRouter;