const {User} = require("../models");
const {validationResult, matchedData} = require("express-validator");
const {ValidationError} = require("sequelize");
exports.index = async (req, res) => {

  try {
    const users = await User.findAll({
      attributes: {exclude: ["password"]},
    });

    return res.json({message: "Utilisateurs chargés", data: users});
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

    return res.status(201).json({message: "Utilisateur crée", data: user.toJSON()});
  } catch (error) {
    console.log("Error:", error)
    if (error instanceof ValidationError) {
      return res.status(422).json({message: error.errors[0].message, error});
    }
    return res.status(500).json({message: "Une erreur est survenue", error: error.message});
  }
};
