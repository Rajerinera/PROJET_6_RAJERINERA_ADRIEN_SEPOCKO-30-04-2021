const emailSchema = require('validator');

module.exports = (req, res, next) => {
    if(!emailSchema.isEmail(req.body.email)){
        return res.status(400).json({
            error: 'Un email valide stp cas: adrien@gmail.com',
        });

    }else{
        next();
    }
}