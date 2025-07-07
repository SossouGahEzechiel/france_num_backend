const {sequelize} = require("../database/init")
const {DataTypes} = require("sequelize");

const tableName = "forms";

module.exports = sequelize.define(tableName, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Votre nom est obligatoire"},
      len: {
        args: [2, 100],
        msg: "Votre nom doit avoir entre 2 et 100 caractères"
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Votre email est obligatoire"},
      isEmail: {msg: "Votre email n'est pas valide"}
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Votre numéro de téléphone est obligatoire"},
      len: {
        args: [8, 20],
        msg: "Votre numéro de téléphone doit avoir entre 8 et 20 chiffres"
      }
    },
  },
  business: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {msg: "Votre type d'entreprise est obligatoire"},
      notEmpty: {msg: "Votre type d'entreprise est obligatoire"},
      isIn: [["Entreprise", "Artisan", "Commerçant", "Profession Libérale"]],
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "users",
      key: "id"
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  timestamps: true,
});
