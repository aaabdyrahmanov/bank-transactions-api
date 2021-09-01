/**
 * Export middleware
 */
module.exports.validateFormat = require("./validateFormat");
module.exports.cache = require("./cache").cache;
module.exports.redis = require("./cache").redis;
module.exports.setCache = require("./cache").setCache;
