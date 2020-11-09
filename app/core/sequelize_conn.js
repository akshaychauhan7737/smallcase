const Sequelize     = require('sequelize');
const appConstants  = require(`${global.__basePath}app/config/constants`);
const config        = require(`${appConstants.path.app}config/config.${process.env.NODE_ENV || "development"}.json`);

const sequelize = new Sequelize.Sequelize(config.database.mysqlMaster.database, config.database.mysqlMaster.user, config.database.mysqlMaster.password, {
    dialect     : 'mysql',
    port        : config.database.mysqlMaster.port,
    replication : {
        write : config.database.mysqlMaster,
    },
    pool: {
        maxConnections : 10,
        maxIdleTime    : 10000,
    },
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection successfull');
    } catch (error) {
        console.error('Looks like MYSQl connection is down!!', error);
    }
})();

module.exports = {
    sequelize, Sequelize,
};