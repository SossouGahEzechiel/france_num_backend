const {body} = require('express-validator');

module.exports = [
  // Validation du nom complet
  body('fullName')
    .notEmpty()
    .withMessage('Votre nom est obligatoire')
    .isLength({ min: 2, max: 100 })
    .withMessage('Votre nom doit avoir entre 2 et 100 caractères')
    .trim()
    .escape(),

  // Validation de l'email
  body('email')
    .notEmpty()
    .withMessage('Votre email est obligatoire')
    .isEmail()
    .withMessage('Votre email n\'est pas valide')
    .normalizeEmail()
    .trim(),

  // Validation du téléphone
  body('phone')
    .notEmpty()
    .withMessage('Votre numéro de téléphone est obligatoire')
    .isLength({ min: 8, max: 20 })
    .withMessage('Votre numéro de téléphone doit avoir entre 8 et 20 caractères')
    .matches(/^[+]?[\d\s\-()]+$/)
    .withMessage('Format de numéro de téléphone invalide')
    .trim(),

  // Validation du type d'entreprise
  body('business')
    .notEmpty()
    .withMessage('Votre type d\'entreprise est obligatoire')
    .isIn(['Entreprise', 'Artisan', 'Commerçant', 'Profession Libérale'])
    .withMessage('Type d\'entreprise non valide')

];
