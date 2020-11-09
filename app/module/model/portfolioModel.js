const {sequelize, Sequelize}    = require(`${global.__basePath}app/core/sequelize_conn`);
const model                     = {};
const underscore                = require("underscore");

model.getOtpFromDb = async function(id) {
    const result = await OtpModel.findAll({
        where: {
            otpId: id
        }
    });
    return result;
}

module.exports = model;