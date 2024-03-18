const express = require('express');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to MongoDB', err);
    });

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;