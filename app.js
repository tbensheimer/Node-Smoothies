const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();
mongoose.set({strictQuery: true});

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = "mongodb+srv://tbensheimer:test123456@cluster0.vmsypjh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => {
    app.listen(3000);
})
.catch((err) => {
console.log(err);
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/smoothies', (req, res) => {
    res.render('smoothies');
})

app.get('/set-cookies', (req, res) => {
    // res.cookie('newUser', true);
    // res.cookie('isEmployee', {maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true})
    res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newEmployee', true);
    res.send('you got the cookies');
})

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    res.json(cookies)
})

app.use(authRoutes);

