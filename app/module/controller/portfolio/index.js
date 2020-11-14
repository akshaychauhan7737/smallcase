const constants   = require(__basePath + 'app/config/constants');
const router      = require('express').Router({
    caseSensitive   : true,
    strict          : true
});
const controller    = require(constants.path.module + 'portfolio/portfolioController');
const validation    = require(constants.path.module + 'validate/portfolioValidator');

router.get(
    '/list/:userId', 
    validation.listPortfolio, 
    controller.listPortfolio
);

router.post(
    '/:userId/:tradingSymbol', 
    validation.upsertPortfolio, 
    controller.upsertPortfolio
);

module.exports = {
    router: router
};