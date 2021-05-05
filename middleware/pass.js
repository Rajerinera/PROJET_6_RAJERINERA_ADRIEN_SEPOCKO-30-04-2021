const passSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passSchema.validate(req.body.password)) {
        console.log(passSchema);
        return res.status(400).json({
            error:
                "Mot de passe erroné! il faut au moins 8 caractères et 1 chiffre et pas d'espace " + passSchema.validate("essayer encore", { list: true }),
        });
    }else{
        next();
    }
};