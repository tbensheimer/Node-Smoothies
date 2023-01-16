const User = require('../models/user.js');

const handleErrors = (err) =>{
    let errors = {email: "", password: ""}

    if(err._message.includes('user validation failed')) {
        console.log('here are error values');
        console.log(Object.values(err.errors));
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
const {email, password} = req.body;

try {
    const user = await User.create({email, password})
    res.status(201).json(user); 
} 
catch (err) {
const errors = handleErrors(err);
res.status(400).json({errors});
}
}

module.exports.login_get = (req, res) => {
res.render('login');
}

module.exports.login_post = (req, res) => {
const {email, password} = req.body;

res.send(email);
}