const {sequelize} = require("./../database/init");
const {DataTypes} = require("sequelize");

const tableName = "users";

module.exports = sequelize.define(tableName, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {msg: "Adresse mail non valide"},
      isNotNull: {msg: "L'adresse mail est obligatoire"},
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNotNull: {msg: "Le mot de passe est obligatoire"},
    }
  },
}, {
  timestamps: true,
  updatedAt: false
});
