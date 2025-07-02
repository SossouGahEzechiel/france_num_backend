const {body} = require('express-validator');

const loginValidator = [
  body('email').notEmpty().withMessage('Votre adresse mail est obligatoire')
    .isEmail().withMessage('Votre adresse mail n\'est pas valide'),
  body('password').notEmpty().withMessage('Votre mot de passe est obligatoire')
]

module.exports = {loginValidator}
