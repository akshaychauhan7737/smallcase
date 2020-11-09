const redis         = require('redis');
const { logger }    = require('./logger');
const promise       = require('bluebird');
const genericPool   = require("generic-pool");
const config        = require("./config");


class Cache {

    constructor() {
        this.connectionDetails  = config.redis;
        this.pool               = null;
        this._createPoolConnection();
    }

    errorHandling (pool, client, error) {
        if (['NR_CLOSED', 'CONNECTION_BROKEN'].indexOf(error.code) != -1) {
            pool.destroy(client);
        }

        return new Error('Cache connection Error');
    }
    
    createFactory (connectionDetails) {
        let _this   = this;
        return {
            create: () => {
                return _this._getClient(connectionDetails);
            },
            destroy: (client) => {
                client.quit();
            }
        };
    }

    _createPoolConnection() {
        if (true !== this.connectionDetails.switch) {
            return {};
        }

        this.pool = {
            MASTER   : genericPool.createPool(
                this.createFactory(this.connectionDetails),
                {
                    max: this.connectionDetails.maxConnections,
                    min: this.connectionDetails.minConnections
                }
            ),
        };
    };

    _getClient(configuration) {
        // Variable is defined to add aditional client configuration 
        configuration.retry_strategy = function (options) {
            if (options.error && options.error.code === 'ECONNREFUSED') {
                logger.error('Redis Connection Error' + JSON.stringify(options.error));
                return new Error('Cache connection Error')
            }
            return Math.min(options.attempt * 10000, 20000);
        };

        return redis.createClient(configuration);
    };
    
    prepareKey  (keyArray) {
        return keyArray.join(':');
    }

    set(key, data, options = []) {
        let _this = this;
        if (true !== this.connectionDetails.switch) {
            return promise.resolve({});
        }

        let pool    = this.pool.MASTER;

        return new promise((resolve, reject) => {
            return pool.acquire()
                .then((client) => {
                    if (options.ttl) {
                        return client.setex(key, options.ttl, JSON.stringify(data), (error, result) => {
                            if (error) { return reject(_this.errorHandling(pool, client, error)); }

                            pool.release(client);
                            return resolve(result);
                        });
                    }

                    return client.set(key, JSON.stringify(data), (error, result) => {
                        if (error) { return reject(_this.errorHandling(pool, client, error)); }

                        pool.release(client);
                        return resolve(result);
                    });
                })
                .catch(reject);
        });
    }

    //Get key data
    get(key) {
        if (true !== this.connectionDetails.switch) {
            return promise.resolve({});
        }
        let _this   = this;
        let pool    = this.pool.MASTER;

        return new promise((resolve, reject) => {
            pool.acquire()
                .then((client) => {
                    return client.get(key, (error, data) => {
                        if (error) { return reject(_this.errorHandling(pool, client, error)); }

                        try{
                            pool.release(client);
                            return resolve(JSON.parse(data));
                        }catch(error){
                            pool.release(client);
                            return resolve({});
                        }
                       
                    });
                })
                .catch(reject);
        });
    }
    
    //Get key data
    delete(key) {
        let _this = this;
        if (true !== this.connectionDetails.switch) {
            return promise.resolve({});
        }

        let pool    = this.pool.MASTER;
        return new promise((resolve, reject) => {
            pool.acquire()
                .then((client) => {
                    return client.del(key, (error, result) => {
                        if (error) { return reject(_this.errorHandling(pool, client, error)); }

                        pool.release(client);
                        return resolve(result === 1);
                    });
                })
                .catch(reject);
        });
    }

    hset(hashKey, key, data, options = {}) {
        let _this = this;
        if (true !== this.connectionDetails.switch) {
            return promise.resolve({});
        }

        let pool    = this.pool.MASTER;

        return new promise((resolve, reject) => {
            pool.acquire()
                .then((client) => {

                    if (options.ttl) {
                        
                        return client.hset(hashKey, key, JSON.stringify(data), 'EX', options.ttl, (error, result) => {
                            if (error) { return reject(_this.errorHandling(pool, client, error)); }

                            pool.release(client);
                            return resolve(result);
                        });
                    }

                    return client.hset(hashKey, key, JSON.stringify(data), (error, result) => {
                        if (error) { return reject(_this.errorHandling(pool, client, error)); }

                        pool.release(client);
                        return resolve(result);
                    });
                })
                .catch(reject);
        });
    }
    
    hget(hashKey, key) {        
        if (true !== this.connectionDetails.switch) {
            return promise.resolve({});
        }
        let _this   = this;
        let pool    = this.pool.MASTER;

        return new promise((resolve, reject) => {
            pool.acquire()
                .then((client) => {
                    return client.hget(hashKey, key, (error, result) => {
                        if (error) { return reject(_this.errorHandling(pool, client, error)); }

                        pool.release(client);
                        return resolve(JSON.parse(result));
                    });                    
                })
                .catch(reject);
        });
    }

}

module.exports = (new Cache);