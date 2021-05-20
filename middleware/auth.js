//qui permet de faire le lien entre la base de donnée et notre projet dans le cadre des mots de passes

const jwt = require('jsonwebtoken');

// création d'un mot de passe sécurisé pour sécurisé les demandes d'authentification dans notre application
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};