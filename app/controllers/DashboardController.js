const {User, Form} = require("../models");
const {Op} = require("sequelize");

exports.index = async (req, res) => {
  let data = {
    administratorsCount: 0,
    messagesCount: 0
  };

  data.administratorsCount = await User.count({
    where: {
      isActive: {[Op.is]: true}
    }
  });

  data.messagesCount = await Form.count({
    where: {
      viewed: {[Op.is]: false}
    }
  });

  return res.status(200).json({
    message: "Données chargées avec succès",
    data
  });
}
