const constants 	    = require(__basePath + '/app/config/constants');
const response 		    = require(constants.path.app + 'util/response');
const validationHelper  = require(constants.path.module + 'validate/validation');

exports.userLogin = function (req, res, next) {
   let headerSchema = {};
 
   let schema = {};
 
   let bodySchema = {
        email : {
           notEmpty: true
        },
        password : {
            notEmpty: true
        }
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