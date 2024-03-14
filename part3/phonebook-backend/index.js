const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const Person = require('./models/person');

const app = express();
const port = 3001;

app.use(express.json());
morgan.token('body', (req) => {
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/info', (req, res) => {
    Person.countDocuments({})
        .then((result) => {
            if(result) {
                const htmlStr = `<p>Phonebook has info for ${result}<br/><br/>${new Date().toString()}</p>`
                res.send(htmlStr);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).end();
        });
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then((result) => {
            if(result) {
                res.json(result);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
})

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then((person) => {
            if(person) {
                res.json(person);
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(404).end();
        });
})

app.delete('/api/persons/:id', (req, res) => {
    Person.deleteOne({_id: req.params.id})
        .then((result) => {
            if(result.acknowledged) {
                res.status(204).end();
            }
            else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).end();
        });
})

app.post('/api/persons', async (req, res) => {
    const body = req.body;

    if(!body.name || !body.number) {
        res.status(400).json({ err: 'wrong request body' });
    }
    else {
        try {
            const person = await Person.findOne({name: body.name});

            if(person) {
                res.status(409).json({ err: 'name must be unique' });
            }
            else {
                const newPerson = new Person(body);

                const result = await newPerson.save();
                res.json(result);
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).end();
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})