require("dotenv").config();

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: process.env.DB_STORAGE || "./database/database.sqlite",
    logging: console.log
  }
};
