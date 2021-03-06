// les packages qui constitue l'application
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const sessionCookie = require('express-session');
const helmet = require('helmet');
require('dotenv').config()


// les chemins qui seront appliqué à notre application
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//la configuration de la base de donnée mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connexion à MongoDB effectuée'))
    .catch(() => console.log('connexion à MongoDB fail'));

const app = express();

// la configuration qui permet à notre api, backend et frontend d'interargir
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());

//configuration pour les cookies

const sessionConfig = {
    name: 'projet6',
    secret: 'THIS IS A SECRET',
    cookie: {
        maxAge: 1000 * 60 * 60, // temps d'activation du cookie
        secure: true, // uniquement 'true' en https
        httpOnly: true, // pas d'accès via javascript
        domain: "http://localhost:3000/",
    },
    resave: true,
    saveUninitialized: true,
}
app.use(sessionCookie(sessionConfig))

//configuration pour sécuriser notre application web
app.use(helmet());

// configuration des différents routes qui consitute notre backend
app.use("/images", express.static(path.join( __dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;