const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [isEmail, 'Please enter a valid email'],
        lowercase: true
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

const User = mongoose.model('user', userSchema);

module.exports = User;