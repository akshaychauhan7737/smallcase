/**
 * Authentication Controller
 * 
 * @author Prerita
 */
const constants 	= require(__basePath + '/app/config/constants');
const response 		= require(constants.path.app + 'util/response');
const authService   = require(constants.path.app + 'module/service/authService');
const { logger }    = require(constants.path.app + 'core/logger');
const underscore    = require('underscore');

exports.userLogin = async function (req, res, next) {
    try{
        const results = await authService.userLogin(req.body);
        if(typeof results.authToken !== 'undefined'){
            return res.status(200).json(response.build('SUCCESS',results));
        } else {
            return res.status(401).json(response.build('FAILURE',results));
        }
    } catch(error){
        logger.error(error);
        return res.status(500).json(response.build('SERVER_ERROR', "Please try again later"));
    }
}