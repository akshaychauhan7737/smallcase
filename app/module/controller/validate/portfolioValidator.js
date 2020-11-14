const constants 	    = require(__basePath + '/app/config/constants');
const response 		    = require(constants.path.app + 'util/response');
const validationHelper  = require(constants.path.module + 'validate/validation');

exports.listPortfolio = function (req, res, next) {
   let headerSchema = {};
 
   let schema = {
       userId : {
            notEmpty: true
        }
    };
 
   let bodySchema = {
        
   };
   req.checkHeaders(headerSchema);
   req.checkParams(schema);
   req.checkBody(bodySchema);
 
   req.getValidationResult().then(function (result) {
       if (false === result.isEmpty()) {
           return res.status(400).json(response.build(
               'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
           )).end();
       } 
       next();
   });
};


exports.upsertPortfolio = function (req, res, next) {
    let headerSchema = {};
  
    let schema = {
        userId : {
             notEmpty: true
         }
     };
  
    let bodySchema = {
         
    };
    req.checkHeaders(headerSchema);
    req.checkParams(schema);
    req.checkBody(bodySchema);
  
    req.getValidationResult().then(function (result) {
        if (false === result.isEmpty()) {
            return res.status(400).json(response.build(
                'ERROR_VALIDATION', validationHelper.parseValidationErrors(result.mapped())
            )).end();
        } 
        next();
    });
 };