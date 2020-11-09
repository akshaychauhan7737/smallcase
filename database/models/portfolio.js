const appConstants              = require(`${global.__basePath}app/config/constants`);
const { sequelize, Sequelize }  = require(`${appConstants.path.app}core/sequelize_conn.js`);
const { Model, DataTypes }      = Sequelize;

class Portfolio extends Model {}
Portfolio.init({
  tokenId: {
    allowNull     : false,
    autoIncrement : true,
    primaryKey    : true,
    type          : Sequelize.INTEGER(11)
  },
  userId: Sequelize.INTEGER(11),
  token: Sequelize.STRING
}, {
  sequelize,
  modelName  : 'auths',
  timestamps : true,
  tableName  : 'auths',
});

module.exports = Portfolio;