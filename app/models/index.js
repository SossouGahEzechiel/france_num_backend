const Form = require("./Form.js");
const ContactData = require("./ContactData.js");
const User = require("./User");

ContactData.belongsTo(User);

module.exports = {
  Form,
  ContactData,
  User
};
