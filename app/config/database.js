require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database/database.sqlite",
    logging: console.log
  },
  production: {
    dialect: process.env.DB_DIALECT || "postgres",
    url: process.env.DB_CONNEXION_STRING,
    logging: console.warn,
    dialectOptions: {
      ssl: {
        require: true, // Exiger SSL
        rejectUnauthorized: false // Accepter les certificats auto-signés
      }
    },
  }
};
