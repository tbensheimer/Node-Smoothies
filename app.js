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

app.use(authRoutes);

