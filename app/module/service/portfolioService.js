const constants 	    = require(__basePath + '/app/config/constants');
const portfolioModel    = require(constants.path.app + 'module/model/portfolioModel');
const underscore        = require("underscore");

exports.getUserPortfolio = async function (userId) {
    return await portfolioModel.getUserPortfolio(userId);
}

exports.upsertPortfolio = async (userId,tradingSymbol,qty,type) => {
    const response = {success : true,message : "Something went wrong"};
    const data = await portfolioModel.getPortfolioData(userId,tradingSymbol);
    if(type == "BUY"){
        if(underscore.isEmpty(data)){
            const portfolio = {
                userId,
                tickerSymbol:tradingSymbol,
                avgBuyPrice : 100 ,
                qty
            };
            await portfolioModel.addPortfolio(portfolio);
            response.success = true;
            response.message = "Portfolio added Successfully";
        }else{
            const dbPortfolio = data[0];
            const portfolio = {  
                qty : dbPortfolio.qty + qty
            };
            await portfolioModel.updatePortfolio(portfolio,userId,tradingSymbol);
            response.success = true;
            response.message = "Portfolio Updated Successfully";
        }
    }else if(type == "SELL"){
        if(underscore.isEmpty(data)){
            response.success = false;
            response.message = "Dont have sufficient Stocks to sell";
        }else{
            const dbPortfolio = data[0];
            if(dbPortfolio.qty >= qty){
                const portfolio = {  
                    qty : dbPortfolio.qty - qty
                };
                await portfolioModel.updatePortfolio(portfolio,userId,tradingSymbol);
                response.success = true;
                response.message = "Portfolio Updated Successfully";
            }else{
                response.success = false;
                response.message = "Insufficient Funds";
            }
        }
    }else{
        response.success = false;
        response.message = "Invalid type";
    }

    return response;
}