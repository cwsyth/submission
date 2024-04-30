const errorHandler = (err, req, res, next) => {
    console.log(err.name);

    if(err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    else if(err.name === 'CastError') {
        return res.status(400).send({ error: 'wrong id format' });
    }
    else if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
        return res.status(400).json({ error: 'username must be unique' });
    }
    else if(err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' });
    }
    else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'token expired'});
    }

    next(err);
};

module.exports = { errorHandler };