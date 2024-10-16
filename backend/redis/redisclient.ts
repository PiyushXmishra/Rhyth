
import Redis from 'ioredis';

// Create and export a Redis client
const serviceUri = process.env.SERVICE_URI || ""
const redisClient = new Redis(serviceUri);
// Optional: Handle Redis connection events
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
