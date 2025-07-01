const {Form} = require("../models");
const {ValidationError} = require("sequelize");
const {dateFormatter} = require("../helpers");

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
  Form.create(req.body)
    .then(() => res.status(201).json({message: "Formulaire envoyé"}))
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(422).json({message: error.errors[0].message, error});
      }
      return res.status(500).json({message: "Une erreur est survenue", error});
    });
}

exports.show = (req, res) => {
  Form.findByPk(req.params.id)
    .then(form => {
      if (!form) {
        return res.status(404).json({message: "Formulaire introuvable"});
      }
      return res.json({message: "Formulaires chargé", data: form});
    })
    .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
}

// exports.news = (req, res) => {
//   Form.findAll({
//     where: {
//
//     }
//   })
//     .then(forms => {
//       forms = forms.map(form => {
//         return {
//           ...form.toJSON(),
//           createdAt: dateFormatter(form.createdAt),
//         }
//       });
//       return res.json({message: "Formulaires chargés", data: forms})
//     })
//     .catch((error) => res.status(500).json({message: "Une erreur est survenue", error}));
// }
