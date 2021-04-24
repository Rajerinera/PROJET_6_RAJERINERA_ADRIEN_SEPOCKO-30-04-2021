const User = require('../models/user');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        }) 
        user.save()
        .then(()=> res.status(201).json({messsage: "utilisateur crée!"}))
        .catch(error => res.status(400).json({error}));   
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => { 
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error: "Utilisateur non trouvé!"})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({error: 'MDP Wrong!'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
}; 