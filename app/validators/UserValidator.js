const {body} = require('express-validator');

module.exports = [
  body("email")
    .notEmpty().withMessage("L'adresse mail est obligatoire")
    .isEmail().withMessage("Adresse mail non valide").normalizeEmail().trim().escape()
  ,

  body("name")
    .notEmpty().withMessage("Le nom est obligatoire")
];
