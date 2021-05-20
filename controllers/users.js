// Page Js qui prends en charge les configurations permettant de setup les routes concernant l'authentification
const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const maskdata = require('maskdata');

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

// controllers qui configure la création d'utilisateur à travers l'email 
exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: maskdata.maskEmail2(req.body.email, emailMask2Options),
            password: hash,
        });
        user.save()
        .then(()=> res.status(201).json({messsage: "utilisateur crée!"})) 
        .catch((error) => res.status(400).json({error}));   
    })
    .catch(error => res.status(500).json({error}));
};

// controllers qui configure le mot de passe des utilisateurs quand il s'autentifie avec leurs email
exports.login = (req, res, next) => { 
    User.findOne({email: maskdata.maskEmail2(req.body.email, emailMask2Options),
    })
    .then(user => {
        if(!user){
            return res.status(401).json({error: "Utilisateur non trouvé!"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if(!valid){
                return res.status(401).json({error: 'MDP Wrong!'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    process.env.TOKEN,
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}; 