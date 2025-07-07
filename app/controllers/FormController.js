const {Form} = require("../models");
const {ValidationError, Op} = require("sequelize");
const {dateFormatter} = require("../helpers");
const {validationResult, matchedData} = require("express-validator");

exports.index = (req, res) => {
  Form.findAll()
    .then(forms => {
      forms = forms.map(form => {
        return {
          ...form.toJSON(),
          createdAt: dateFormatter(form.createdAt),
        }
      });
      return res.json({message: "Formulaires chargés", data: forms})
    })
    .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
}

exports.store = (req, res) => {

  const results = validationResult(req);

  if (!results.isEmpty()) {
    return res.status(422).json({message: results.array().at(0).msg, error: results})
  }

  Form.create(matchedData(req))
    .then(async form => {
      res.status(201).json({message: "Formulaire envoyé"});
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(422).json({message: error.errors[0].message, error});
      }
      return res.status(500).json({message: "Une erreur est survenue", error});
    });
}

exports.update = (req, res) => {
  Form.update({updatedAt: new Date(), viewed: true, userId: req.user.id}, {
    where: {id: req.params.id}
  })
    .then(([form]) => {
      if (!form) {
        return res.status(404).json({message: "Formulaire introuvable"});
      }
      return res.json({message: "Formulaires chargé", data: form});
    })
    .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
}

exports.news = (req, res) => {
  Form.findAll({
    where: {
      viewed: {[Op.is]: false},
    }
  })
    .then(forms => {
      forms = forms.map(form => {
        return {
          ...form.toJSON(),
          createdAt: dateFormatter(form.createdAt),
        }
      });
      return res.json({message: "Formulaires chargés", data: forms})
    })
    .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
};

exports.old = (req, res) => {
  Form.findAll({
    where: {
      viewed: {[Op.not]: false},
    }
  })
    .then(forms => {
      forms = forms.map(form => {
        return {
          ...form.toJSON(),
          createdAt: dateFormatter(form.createdAt),
        }
      });
      return res.json({message: "Formulaires chargés", data: forms})
    })
    .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
}
