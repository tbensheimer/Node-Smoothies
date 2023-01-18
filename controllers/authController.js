const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const handleErrors = (err) =>{
    let errors = {email: "", password: ""}
    console.log(err);

    if(err.message == 'incorrect email') {
        errors.email = 'email is not registered';
        return errors;
    }

    if(err.message == 'incorrect password') {
        errors.password = 'password is not correct';
        return errors;
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
    }

  if(err._message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

const maxAge = 3 * 60 * 60 * 24;
const createToken = (id) => {
    return jwt.sign({id}, 'net ninja secret', {expiresIn: maxAge});
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
const {email, password} = req.body;

try {
    const user = await User.create({email, password})
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id }); 
} 
catch (err) {
const errors = handleErrors(err);
res.status(400).json({errors});
}
}

module.exports.login_get = (req, res) => {
res.render('login');
}

module.exports.login_post = async (req, res) => {
const {email, password} = req.body;

try {
const user = await User.login(email, password);
const token = createToken(user._id);
res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
res.status(200).json({user: user._id});

}
catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
}

}