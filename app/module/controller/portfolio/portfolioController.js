const constants 	= require(__basePath + '/app/config/constants');
const response 		= require(constants.path.app + 'util/response');
const portfolioService   = require(constants.path.app + 'module/service/portfolioService');
const { logger }    = require(constants.path.app + 'core/logger');
const underscore    = require('underscore');

exports.listPortfolio = async function (req, res) {
    try{
        const { userId } = req.params;
        const results = await portfolioService.getUserPortfolio(userId);
        return res.status(200).json(response.build('SUCCESS',results));
    } catch(error){
        console.log(error)
        return res.status(500).json(response.build('SERVER_ERROR', "Please try again later"));
    }
}

exports.upsertPortfolio = async function (req, res) {
    try{
        const { userId,tradingSymbol }  = req.params;
        const { qty,type }              = req.body;
        const results = await portfolioService.upsertPortfolio(userId,tradingSymbol,qty,type);
        return res.status(200).json(response.build('SUCCESS',results));
    } catch(error){
        console.log(error)
        return res.status(500).json(response.build('SERVER_ERROR', "Please try again later"));
    }
}