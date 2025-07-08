const {verify} = require("jsonwebtoken");
const {User} = require("../models");
const {protectedRoutes, unProtectedRoutes} = require("../routes/_routesDefinition");

module.exports = (req, res, next) => {

  console.log("unProtectedRoutes:", unProtectedRoutes)
  // Exemption de contrôle sur les routes non protégées
  if (unProtectedRoutes.some(route => route.url === req.path && route.method === req.method)) {
    return next();
  }

  // Application de contrôle sur les routes protégées
  if (protectedRoutes.some(route => route.url === req.path && route.method === req.method)) {
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
          return next();
        }).catch(() => {
        return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
      })

    } catch (error) {
      console.log("ICI")
      return res.status(401).json({message: "Vous devez vous connecter pour utiliser cette fonctionnalité"});
    }
  }

  // Routes introuvables ou non définies
  return res.status(404).json({message: "Ressource introuvable"});
}
