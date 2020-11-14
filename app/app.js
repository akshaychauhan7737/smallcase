const constant   	= require(__basePath + 'app/config/constants');
const app        	= require('express')();
const bodyParser 	= require('body-parser');
const validator  	= require('express-validator');
const fileUpload    = require('express-fileupload');
const exception  	= require(constant.path.app + 'core/exception');
const {logger}   	= require(constant.path.app + 'core/logger');
const config     	= require(constant.path.app + 'core/configuration');


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accessToken, accesstoken");
        res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
  });

/*
 * @description Middlewares for parsing body
 */
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator({}));

/*
 * Injecting all dependencies Modules + common libs
 */
require(constant.path.app + 'config/routes')(app);

/*
 * @description Catch 404 error if no route found
 */
app.use(function (req, res) {
    return res.status(400).json({
        status       : false,
        statusMessage: '404 - Page Not found'
    });
});

/*
 * @description Error handler
 */
app.use(exception.errorHandler);


module.exports = app;
