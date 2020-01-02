// const redis = require('redis');
// const bluebird = require('bluebird');
// const client = redis.createClient();
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// client.on('connect', () => console.log('job resolver connected to redis'));
const fs = require('fs');

module.exports = {
    Query: {
        async getJobs(parent, {key}) {
            // try {
                // return client.getAsync(key);
                // JSON.parse(result);
            // } catch (err) {
                // throw new Error(err);
            // }
            let jobs;
            if(key == 'github'){
                jobs = fs.readFileSync('github.txt', 'utf8');
            } else if (key == 'stackoverflow') {
                jobs = fs.readFileSync('stackoverflow.txt', 'utf8');
            }
            return jobs;
        }
    }
}