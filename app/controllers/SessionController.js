const {User} = require("../models");
const {sign} = require("jsonwebtoken");
const {validationResult, matchedData} = require("express-validator")

require("dotenv").config();

exports.login = (req, res) => {

  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(422).json({message: results.array().at(0).msg, error: results})
  }

  const {email, password} = matchedData(req);

  try {
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          return res.status(422).json({message: "Identifiants incorrects"});
        }

        if (!user.comparePassword(password)) {
          return res.status(422).json({message: "Identifiants incorrects"});
        }

        const token = sign(
          {userId: user.id},
          process.env.JWT_SECRET,
          {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        return res.status(200).json({
          data: {
            user: user.toJSON(),
            token
          }
        });
      });
  } catch (e) {
    return res.status(500).json({message: "Une erreur est survenue", error: e});
  }
};

exports.logout = (req, res) => {
  if (!req.user) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  req.user = null;
  return res.status(200).json({message: "Déconnecté"});
};

exports.refreshData = (req, res) => {
  if (!req.user) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  return res.status(200).json({data: req.user});
};
