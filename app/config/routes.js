const constant = require(__basePath + 'app/config/constants');
const logger   = require(constant.path.app + 'core/logger');
const config   = require(constant.path.app + 'core/configuration');

module.exports = function (app) {
    //Setting dependencies
    app.use('/portfolio', require(constant.path.module + 'portfolio').router);
};