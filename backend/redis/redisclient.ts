
import Redis from 'ioredis';

const serviceUri = process.env.SERVICE_URI || ""
const redisClient = new Redis(serviceUri);
redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});


export default redisClient;
