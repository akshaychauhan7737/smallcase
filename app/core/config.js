const appConstants  = require(`${global.__basePath}app/config/constants`);
const config        = require(`${appConstants.path.app}config/config.${process.env.NODE_ENV || "development"}.json`);
module.exports      = config