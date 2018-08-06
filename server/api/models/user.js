const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 4
    },
    email: {
        type: String,
        trim: true,
        minlength: 8,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;