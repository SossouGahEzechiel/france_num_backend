const {Sequelize} = require("sequelize");
const config = require("../config/database");

const env = process.env.NODE_ENV || "development";

const sequelize = config[env].url
  ? new Sequelize(config[env].url, {
    dialect: config[env].dialect,
    logging: config[env].logging,
    dialectOptions: config[env].dialectOptions,
  })
  : new Sequelize(config[env]);


sequelize.authenticate()
  .then(() => console.log('Connexion réussie à PostgresSQL'))
  .catch((err) => console.error('Erreur de connexion :', err));

module.exports = {sequelize};
