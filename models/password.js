const passValidator = require('password-validator');

const passSchema = new passValidator();

passSchema
    .is().min(8) //minimum de la longueur du mdp
    .is().max(100) //maximum de la longueur du mdp
    .has().uppercase() // majuscule obligatoire dans le mdp
    .has().lowercase() // minuscule obligatoire dans le mdp
    .has().digits(2) // nombre de chiffre obligatoire dans le mdp
    .has().not().spaces() // pas d'espaces dans le mdp
    .is().not().oneOf(['Motdepasse1', 'motdepasse2']); 

console.log(passSchema.validate('les règles à rappeler', {list: true})); 


module.exports = passSchema;