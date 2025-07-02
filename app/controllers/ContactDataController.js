const {ContactData} = require("../models");
const {ValidationError} = require("sequelize");
const {dateFormatter} = require("./../helpers/index");
const {validationResult, matchedData} = require("express-validator");

exports.index = (req, res) => {
  ContactData.findAll({attributes: {exclude: ["createdAt"]}})
    .then(data => {
      let config = data.at(0);
      if(!config)
        return res.json({message: "Aucune configuration", data: {}});
      config = {
        ...config.toJSON(),
        updatedAt: dateFormatter(config.updatedAt)
      };
      res.json({data: config || {}})
    })
    .catch(error => res.status(500).json({message: error.message, error}));
};

exports.update = (req, res) => {

  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(422).json({message: results.array().at(0).msg, error: results.array()})
  }

  ContactData.update(matchedData(req), {
    where: {id: req.params.id},
  })
    .then(([status]) => {
      if(!status) {
        return res.status(500).json({message: "La mise à jour a échoué"});
      }

      ContactData.findByPk(req.params.id, {
        attributes: {exclude: ["createdAt"]}
      })
        .then(data => {
          let config = data.toJSON();
          config = {
            ...config,
            updatedAt: dateFormatter(config.updatedAt)
          };
          res.json({data: config || {}});
        });
    })
    .catch(error => {
      if (error instanceof ValidationError)
        return res.status(422).json({message: error.message, error});

      return res.status(500).json({message: error.message, error})
    });
}
