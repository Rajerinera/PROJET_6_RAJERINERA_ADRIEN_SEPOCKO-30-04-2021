const emailSchema = require('validator');
console.log("-------email verifié---------");

module.exports = (req, res, next) => {
    if(!emailSchema.isEmail(req.body.email)){
        console.log("...", emailSchema);
        return res.status(400).json({
            error: 'Un email valide stp cas: adrien@gmail.com',
        });

    }else{
        next();
    }
}