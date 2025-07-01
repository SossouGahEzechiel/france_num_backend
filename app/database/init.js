const {Sequelize} = require('sequelize');
const config = require('./../config/database');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

const initDb = async (force = false) => {
	await sequelize.sync({force});
	console.log('Database synced');
};

module.exports = {sequelize, initDb};
