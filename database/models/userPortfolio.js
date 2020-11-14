const appConstants              = require(`${global.__basePath}app/config/constants`);
const { sequelize, Sequelize }  = require(`${appConstants.path.app}core/sequelize_conn.js`);
const { Model, DataTypes }      = Sequelize;

class userPortfolio extends Model {}
userPortfolio.init({
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
  sequelize,
  modelName  : 'userPortfolio',
  timestamps : false,
  tableName  : 'userportfolio',
});

module.exports = userPortfolio;