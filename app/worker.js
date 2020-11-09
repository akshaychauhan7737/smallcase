const constants 	      = require(__basePath + '/app/config/constants');
const config            = require(constants.path.app + "/core/config");
const fs                = require('fs');
const kue               = require('kue');
const queue             = kue.createQueue();

module.exports = {
    queue : queue
};