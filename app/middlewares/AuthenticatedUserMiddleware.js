const collect = require("collect.js");

const {verify} = require("jsonwebtoken");
const {User} = require("../models");

const unProtectedRoutes = collect.collect([
  {
    url: "/api/auth/login",
    method: "POST"
  },
  {
    url: "/api/forms",
    method: "POST"
  },
  {
    url: "/api/contact-data",
    method: "GET"
  }
]);


module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (unProtectedRoutes.contains(route => route.url === req.path && route.method === req.method)) {
    return next();
  }

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
        return next();
      }).catch(() => {
      return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
    })

  } catch (error) {
    return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
  }
}
