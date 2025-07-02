const {User} = require("../models");
const {compare} = require("bcrypt");
const {sign} = require("jsonwebtoken");

require("dotenv").config();

exports.login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  if (!email || !password) {
    return res.status(422).json({message: "L'email et le mot de passe sont requis"});
  }

  try {
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          return res.status(422).json({message: "Identifiants incorrects"});
        }

        compare(password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(422).json({message: "Identifiants incorrects"});
            }

            const token = sign(
              {userId: user.id},
              process.env.JWT_SECRET,
              {expiresIn: process.env.JWT_EXPIRES_IN}
            );
            const {password, ...safeData} = user.toJSON();
            return res.status(200).json({
              data: {
                user: safeData,
                token
              }
            });
          })
          .catch(error => res.status(500).json({message: "Une erreur est survenue", error: error.message}));
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
