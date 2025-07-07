const {User} = require("../models");
const {validationResult, matchedData} = require("express-validator");
const {ValidationError} = require("sequelize");
const {dateFormatter} = require("../helpers");
exports.index = async (req, res) => {

  try {
    const users = await User.findAll({
      attributes: {exclude: ["password"]},
    });

    return res.json({
      message: "Utilisateurs chargés",
      data: users.map(user => user.formatDate().toJSON())
    });
  } catch (error) {
    return res.status(500).json({message: "Une erreur est survenue", error});
  }
};

exports.store = async (req, res) => {

  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(422).json({message: results.array().at(0).msg, error: results})
  }

  const {name, email} = matchedData(req);

  try {
    const user = await User.create({name, email, password: "password"});

    return res.status(201).json({message: "Utilisateur crée", data: user.formatDate().toJSON()});
  } catch (error) {
    console.log("Error:", error)
    if (error instanceof ValidationError) {
      return res.status(422).json({message: error.errors[0].message, error});
    }
    return res.status(500).json({message: "Une erreur est survenue", error: error.message});
  }
};

exports.updateAccess = async (req, res) => {

  if(req.params.id === req.user.id)
    return res.status(403).json({message: "Vous ne pouvez pas modifier votre propre compte"});

  const user = await User.findByPk(req.params.id);

  if (!user)
    return res.status(404).json({message: "Utilisateur introuvable"});

  try {
    await user.update({isActive: !user.isActive});
    return res.status(200).json({message: "Utilisateur mis à jour"});
  } catch (error) {
    return res.status(500).json({message: "Une erreur est survenue", error});
  }
};

exports.delete = async (req, res) => {
  if(req.params.id === req.user.id)
    return res.status(403).json({message: "Vous ne pouvez pas modifier votre propre compte"});

  const user = await User.findByPk(req.params.id);

  if (!user)
    return res.status(404).json({message: "Utilisateur introuvable"});

  try {
    await user.destroy();
    return res.status(200).json({message: "Utilisateur supprimé"});
  } catch (error) {
    return res.status(500).json({message: "Une erreur est survenue", error});
  }
};
