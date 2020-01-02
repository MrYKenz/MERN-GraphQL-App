const axios = require('axios');
const fs = require('fs');
// const redis = require('redis');
// const bluebird = require('bluebird');
// const client = redis.createClient();
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// client.on('connect', () => console.log('github worker connected to redis'));
// fix for no redis:

const fetchGithubJobs = async () => {
    let jobs = [];
    let pageNum = 1;
    let descriptions = ['javascript', 'typescript', 'react'];
    // get requests for different job descriptions
    for (const descr of descriptions) {
        // get request to loop through pages until result is 0
        do {
            try {
                results = await axios.get(`https://jobs.github.com/positions.json?description=${descr}&location=london&page=${pageNum}`);
                console.log(results.data.length);
                jobs = jobs.concat(results.data);
                pageNum += 1;
            } catch(error) {
                console.log(error);
            }
        } while (results.data.length != 0);
        // reset page no. for next fetch
        pageNum = 1;
    }
    // not using redis on Heroku
    fs.writeFileSync('github.txt', JSON.stringify(jobs), 'utf8');
    // try {
    //     client.setAsync('github', JSON.stringify(jobs));
    //     console.log('GITHUB FETCH COMPLETE!');
    // } catch(error) {
    //     return error
    // }
}
fetchGithubJobs();

module.exports = fetchGithubJobs;
