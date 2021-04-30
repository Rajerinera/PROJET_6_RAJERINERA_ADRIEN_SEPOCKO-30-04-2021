// les routes qui seront exporté dans notre page js qui regrouge les controllers concernant l'authentification
const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const userCtrl = require('../controllers/users');
const verifyPassword = require('../middleware/pass');
const verifyEmail = require('../middleware/email');

const limit = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 min
    max: 7, // limit de chaque IP à 7 requêtes 
    message: 'Trop requête patienter 3 min'
})

router.post('/signup', verifyEmail, verifyPassword, userCtrl.signup);
router.post('/login',limit, userCtrl.login);

module.exports = router;