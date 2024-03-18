const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('error connecting to MongoDB', err);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                return /[0-9]{2,3}-[0-9]{6,10}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        required: true
    }
});

personSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);