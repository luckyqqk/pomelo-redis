var Redis = require('redis');
module.exports = function(app, opts) {
    var mysqlClient = new RedisClient(app, opts);
    app.set('redis', mysqlClient.redis, true);
    return mysqlClient;
};

var RedisClient = function(app, redisInfo) {
    this.app = app;
    this.redis = Redis.createClient(redisInfo.port, redisInfo.host, redisInfo);
    this.redis.on("error", function(err) {
        console.error(`[redis-plugin]:${err}`);
    });
};

RedisClient.prototype.start = function(cb) {
    cb();
};

RedisClient.prototype.end = function(cb) {
    !!this.redis ? this.redis.end(cb) : cb();
};
