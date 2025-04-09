import Redis from 'ioredis';
import 'dotenv/config';

let redis;

// Redis 인스턴스 생성
(async () => {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    commandTimeout: process.env.REDIS_TIMEOUT,
  });
  redis.on('error', (err) => {
    console.log(err);
  });
})();

// Redis 캐시에서 키로 데이터 가져오기
export async function getCache(key) {
  try {
    const cacheData = await redis.get(key);
    return JSON.parse(cacheData);
  } catch (err) {
    return null;
  }
}

// Redis 캐시에 저장
export function setCache(key, data, ttl = process.env.REDIS_TTL) {
  try {
    redis.set(key, JSON.stringify(data), 'EX', ttl);
  } catch (err) {
    return null;
  }
}

// Redis 캐시 키 제거
export function removeCache(key) {
  try {
    redis.del(key);
  } catch (err) {
    return null;
  }
}
