require("dotenv").config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database/database.sqlite",
    logging: console.log
  },
  production: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false
  }
};
