const Redis = require("ioredis");
const blake3 = require("blake3");

const { CACHE_URL } = require("../config");

let redis;
let redisAvailable = false;
const DEFAULT_CACHE_TTL = 90;

if (process.env.NODE_ENV == "production") {
  if (CACHE_URL) {
    redis = new Redis(CACHE_URL);
  } else {
    redis = new Redis();
  }

  redis.on("error", () => {
    redisAvailable = false;
  });
  redis.on("end", () => {
    redisAvailable = false;
  });
  redis.on("ready", () => {
    redisAvailable = true;
    console.info("Redis connected");
  });
}

/**
 * BLAKE3 hash func for redis keys
 *
 * @param   {String}    str    String to hash
 * @returns {String}  Hashed result
 */
const hash = (str) => blake3.createHash().update(str).digest("hex");

/**
 * Redis get cache
 *
 * @returns {void}
 */
async function cache(req, res, next) {
  if (process.env.NODE_ENV !== "prodcution") {
    return next();
  }

  if (!redisAvailable) {
    res.set("banking-api-cache-online", "false");
    return next();
  }
  res.set("banking-api-cache-online", "true");

  const { url, method, params } = req;
  const key = `banking-cache:${hash(`${method}${url}${params}`)}`;

  // Only allow cache on whitelist methods
  if (!["GET", "POST"].includes(req.method)) {
    return next();
  }

  let cached;
  try {
    cached = await redis.get(key);
    if (cached) {
      res.set("banking-api-cache", "HIT");
      res.set("Content-type", "application/json");
      res.body = cached;
      cached = true;
    }
  } catch (err) {
    console.error(`Failed to get cache: ${err.message}`);
    cached = false;
  }

  req.isCached = cached;

  next();
}

/**
 * Redis set cache
 *
 * @param   {Object}    req       HTTP request
 * @param   {Object}    res       HTTP response
 * @param   {Number}    ttl       Cache TTL in seconds
 */
function setCache(req, res, ttl = DEFAULT_CACHE_TTL) {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (!redisAvailable) {
    res.set("banking-api-cache-online", "false");
    return;
  }
  res.set("banking-api-cache-online", "true");

  const responseBody = JSON.stringify(req.body);

  const { url, method, params } = req;
  const key = `banking-cache:${hash(`${method}${url}${params}`)}`;

  // Only allow cache on whitelist methods
  if (!["GET", "POST"].includes(req.method)) {
    return;
  }

  if (ttl) {
    res.set("Cache-Control", `max-age=${ttl}`);
  } else {
    res.set("Cache-Control", "no-store");
  }

  res.set("banking-api-cache", "MISS");

  // Set cache
  try {
    if (!responseBody) {
      return;
    }
    redis.set(key, responseBody, "EX", ttl);
  } catch (err) {
    console.error(`Failed to set cache: ${err.message}`);
  }
}

// Share redis connection
Object.defineProperty(module.exports, "redis", {
  value: redis,
  writable: false,
});

module.exports = { cache, setCache, redis };
