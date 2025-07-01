const {verify} = require("jsonwebtoken");
const {User} = require("../models");
module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if(!header) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  const [_, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }

  try {
    const payload = verify(token, process.env.JWT_SECRET);

    if (!payload) {
      return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
    }

    User.findByPk(payload.userId)
      .then(user => {
        req.user = user.get({attributes: {exclude: ["password"]}}).toJSON();
        next();
      }).catch(_ => {
      console.log("Auth middleware error:", _);
      return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
    })

  } catch (error) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }
}
