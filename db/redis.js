const redis = require('redis')

const redisCLient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})


module.exports = redisCLient