const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then((res) => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to MongoDB', err);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);