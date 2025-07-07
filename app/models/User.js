const {sequelize} = require("./../database/init");
const {DataTypes} = require("sequelize");
const {hashSync, compare, compareSync} = require("bcrypt");
const {dateFormatter} = require("../helpers");

const tableName = "users";

const User = sequelize.define(tableName, {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {msg: "Cette adresse mail est déjà prise"}
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hashSync(value, parseInt(process.env.BCRYPT_SALT)));
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  timestamps: true,
  updatedAt: false
});

User.prototype.toJSON = function () {
  const values = {...this.get()};
  delete values.password;
  return values;
};

User.prototype.formatDate = function () {
  this.setDataValue("createdAt", dateFormatter(this.getDataValue("createdAt")));
  return this;
};

User.prototype.comparePassword = function (password) {
  return compareSync(password, this.getDataValue("password"));
};

module.exports = User;
