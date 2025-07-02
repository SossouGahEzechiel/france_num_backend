const {body} = require("express-validator");

module.exports = [
  body("phone")
    .notEmpty().withMessage("Votre numéro de téléphone est obligatoire")
    .isLength({min: 8, max: 16}).withMessage("Votre numéro de téléphone doit avoir entre 8 et 16 caractères"),

  body("email")
    .notEmpty().withMessage("Votre adresse mail est obligatoire")
    .isEmail().withMessage("Votre adresse mail n'est pas valide"),

  body("responsibleName")
    .notEmpty().withMessage("Votre nom de responsable est obligatoire")
    .isLength({min: 2, max: 100}).withMessage("Votre nom de responsable doit avoir entre 2 et 100 caractères"),

  body("positionHeld")
    .notEmpty().withMessage("Votre poste est obligatoire")
    .isLength({min: 2, max: 100}).withMessage("Votre poste doit avoir entre 2 et 100 caractères"),
];
