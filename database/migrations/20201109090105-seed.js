'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.bulkInsert('userportfolio', [
      {
        "id"            : 1,
        "userId"        : 1,
        "tickerSymbol"  : "WIPRO",
        "avgBuyPrice"   : 319.25,
        "qty"           : 5
        
      },
      {
        "id"            : 2,
        "userId"        : 1,
        "tickerSymbol"  : "RELIANCE",
        "avgBuyPrice"   : 1833.45,
        "qty"           : 10
        
      },
      {
        "id"            : 3,
        "userId"        : 1,
        "tickerSymbol"  : "GODREJIND",
        "avgBuyPrice"   : 535.00,
        "qty"           : 2
        
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
