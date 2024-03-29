const errorHandler = (err, req, res, next) => {
    console.log(err);

    if(err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    else if(err.name === 'CastError') {
        return res.status(400).send({ error: 'wrong id format' });
    }

    next(err);
};

module.exports = { errorHandler };