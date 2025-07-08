const {verify} = require("jsonwebtoken");
const {User} = require("../models");
const {protectedRoutes, unProtectedRoutes} = require("../routes/_routesDefinition");
const {match} = require("path-to-regexp");

module.exports = (req, res, next) => {

  const isUnprotected = unProtectedRoutes.some(route =>
    // const matcher = match(route.path, { decode: decodeURIComponent });
    // const matched = matcher(req.path);
    // return matched && req.method === route.method;
     route.url === req.path && route.method === req.method
  );

  if (isUnprotected) {
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

      User.findOne({
        where: {
          id: payload.userId,
          isActive: true
        }
      })
        .then(user => {
          if (!user) {
            return res.status(401).json({message: "Votre session a expiré, merci de vous connecter à nouveau ou veuillez contacter l'administrateur"});
          }

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
}
