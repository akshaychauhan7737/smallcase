const {sequelize, Sequelize}    = require(`${global.__basePath}app/core/sequelize_conn`);
const userPortfolio             = require(`${global.__basePath}database/models/userPortfolio`);
const model                     = {};

model.getUserPortfolio  = async function(id) {
    const result        = await userPortfolio.findAll({
        where: {
            userId: id
        }
    });
    return result;
}


model.getPortfolioData = async function (userId,tradingSymbol){
    const result        = await userPortfolio.findAll({
        where: {userId:userId,tickerSymbol:tradingSymbol }
    });
    return result;
}


model.updatePortfolio = async function (data,userId,tradingSymbol){
    const result        = await userPortfolio.update(
        data,
        { where: { userId , tickerSymbol:tradingSymbol }}
    );
    return result;
}


model.addPortfolio = async function (data){
    const result        = await userPortfolio.create(data);
    return result;
}



module.exports = model;