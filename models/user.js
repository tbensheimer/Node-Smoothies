const mongoose = require('mongoose');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})

userSchema.post('save', function(doc, next) {
    console.log('user about to be created and saved', doc);
    next();
})

userSchema.pre('save', function (next) {
    console.log('user about to be created and saved', this);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;