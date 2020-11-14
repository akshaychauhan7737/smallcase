'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('userportfolio', {
      id: {
        type          : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey    : true
      },
      userId        : Sequelize.INTEGER,
      tickerSymbol  : Sequelize.STRING(50),
      avgBuyPrice   : Sequelize.FLOAT,
      qty           : Sequelize.INTEGER
    }, {
      Sequelize,
      timestamps: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('userportfolio');
  }
};
