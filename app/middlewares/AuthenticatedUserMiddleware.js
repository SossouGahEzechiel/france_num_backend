const {verify} = require("jsonwebtoken");
const {User} = require("../models");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  const [_, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({message: "Votre session a expiré, merci de vous connecter à nouveau"});
    }

    User.findByPk(payload.userId)
      .then(user => {
        const {password, ...safeData} = user.toJSON();
        req.user = safeData;
        next();
      }).catch(_ => {
      console.log("Auth middleware error:", _);
      return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
    })

  } catch (error) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }
}
