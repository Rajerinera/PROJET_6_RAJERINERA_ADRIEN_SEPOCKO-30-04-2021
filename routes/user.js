// les routes qui seront exporté dans notre page js qui regrouge les controllers concernant l'authentification
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;