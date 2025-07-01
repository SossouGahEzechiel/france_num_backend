'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const encryptedPassword = await bcrypt.hash("password", 10);

    await queryInterface.bulkInsert("users", [{
      id: require("uuid").v4(),
      email: "admin@test.dev",
      password: encryptedPassword,
      createdAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
