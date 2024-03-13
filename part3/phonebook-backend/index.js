const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3001;

app.use(express.json());
morgan.token('body', (req) => {
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
        "id": 5,
        "name": "Test", 
        "number": "123"
      }
]

const generateId = () => {
    return Math.floor(Math.random() * (100000 - 0) + 100000);
}

app.get('/info', (req, res) => {
    const htmlStr = `<p>Phonebook has info for ${data.length}<br/><br/>${new Date().toString()}</p>`
    res.send(htmlStr);
})

app.get('/api/persons', (req, res) => {
    res.json(data);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    if(!isNaN(id)) {
        const entry = data.find((person) => {
            return person.id === id;
        })
        
        if(entry) {
            res.json(entry);
        }
        else {
            res.status(404).end();
        }
    }
    else {
        res.status(400).json({ err: 'wrong request format'});
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    if(!isNaN(id)) {
        data = data.filter((person) => {
            return person.id !== id;
        });
        
        res.status(204).end();
    }
   else {
        res.status(400).end();
   }
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if(!body.name || !body.number) {
        res.status(400).json({ err: 'wrong request body' });
    }
    else {
        const nameTaken = data.some((person) => {
            return person.name === body.name;
        });

        if(nameTaken) {
            res.status(409).json({ err: 'name must be unique' });
        }
        else {
            const person = {
                id: generateId(),
                ...body
            }
            data.push(person);
    
            res.json(person);
        }
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})