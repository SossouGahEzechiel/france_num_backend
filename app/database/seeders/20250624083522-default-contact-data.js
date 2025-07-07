'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("contact_data", [{
      id: require("uuid").v4(),
      phone: "012 345 678",
      email: "B0z0N@example.com",
      responsibleName: "John Doe",
      positionHeld: "Responsable Marketing",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: null
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("contact_data", null, {});
  }
};
