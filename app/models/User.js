const {sequelize} = require("./../database/init");
const {DataTypes} = require("sequelize");
const {hashSync, compare, compareSync} = require("bcrypt");

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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue("password", hashSync(value, parseInt(process.env.BCRYPT_SALT)));
    }
  },
}, {
  timestamps: true,
  updatedAt: false
});

User.prototype.toJSON = function () {
  const values = {...this.get()};
  delete values.password;
  return values;
};

User.prototype.comparePassword = function (password) {
  return compareSync(password, this.getDataValue("password"));
};

module.exports = User;
