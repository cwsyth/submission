const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: [3, 'username must be at least 3 characters long']
    },
    name: {
        type: String,
        default: ''
    },
    passwordHash: {
        type: String,
        required: true,
    }
});

userSchema.set('toJSON', {
    transform: (doc, obj) => {
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;
        delete obj.passwordHash;
    }
});

module.exports = mongoose.model('User', userSchema);