const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res, next) => {
    Person.countDocuments({})
        .then((result) => {
            if(result) {
                const htmlStr = `<p>Phonebook has info for ${result}<br/><br/>${new Date().toString()}</p>`;
                res.send(htmlStr);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then((result) => {
            if(result) {
                res.json(result);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then((person) => {
            if(person) {
                res.json(person);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then((result) => {
            if(result.acknowledged) {
                res.status(204).end();
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if(!body.name || !body.number) {
        res.status(400).json({ err: 'wrong request body' });
    }
    else {
        const newPerson = new Person(body);
        newPerson.save()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => next(err));
    }
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    Person.findByIdAndUpdate(
        req.params.id,
        body,
        { new: true, runValidators: true, context: 'query' }
    )
        .then((result) => {
            if(result) {
                res.json(result);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
    console.log(err);

    if(err.name === 'CastError') {
        return res.status(400).send({ error: 'wrong id format' });
    }
    else if(err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    
    next(err);
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});