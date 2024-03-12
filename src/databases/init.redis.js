const Redis = require("ioredis");

const uri = process.env.REDIS_URI || "redis://localhost:6379";

const redisClient = new Redis(uri);

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Redis error", error);
});

module.exports = redisClient;
