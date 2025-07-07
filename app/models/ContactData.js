const {sequelize} = require("../database/init");
const {DataTypes} = require("sequelize");

const tableName = "contact_data";

module.exports = sequelize.define(tableName, {
  id: {
    type: DataTypes.UUID,
    default: DataTypes.UUIDV4,
    primaryKey: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Le numéro de téléphone de contact ne peut être vide"}
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Le mail de contact ne peut être vide"},
      isEmail: {msg: "Le mail de contact doit avoir un format valide"}
    }
  },
  responsibleName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Le nom de responsable de contact ne peut être vide"}
    }
  },
  positionHeld: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "La fonction de responsable de contact ne peut être vide"}
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true
  }
});
