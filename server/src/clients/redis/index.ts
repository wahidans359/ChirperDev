import Redis from "ioredis";

import dotenv from "dotenv";
dotenv.config();
export const redisClient = new Redis(
    `redis://default:${process.env.REDIS_PASS}@just-redbird-31297.upstash.io:6379`
)

