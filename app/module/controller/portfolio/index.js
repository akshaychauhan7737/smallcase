const constants   = require(__basePath + 'app/config/constants');
const router      = require('express').Router({
    caseSensitive: true,
    strict       : true
});
const controller    = require(constants.path.module + 'portfolio/authController');
const validation    = require(constants.path.module + 'validate/portfolioValidator');

router.get(
    '/list', 
    validation.userLogin, 
    controller.userLogin
);
router.post(
    '/:id', 
    validation.userLogin, 
    controller.userLogin
);
router.get(
    '/', 
    validation.userLogin, 
    controller.userLogin
);

module.exports = {
    router: router
};