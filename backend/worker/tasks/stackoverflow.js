const Parser = require('rss-parser');
const fs = require('fs');
// const redis = require('redis');
// const bluebird = require('bluebird');

const parser = new Parser();
// const client = redis.createClient();
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

// client.on('connect', () => console.log('StackOverflow worker connected to redis'));

const fetchSOJobs = async () => {
    let jobs = [];
    try {
        let feed = await parser.parseURL(`https://stackoverflow.com/jobs/feed?tl=reactjs+node.js+typescript&l=london&d=10&u=Miles`);
        // console.log(feed.items)
        feed.items.forEach(item => {
            jobs.push(item);
        });
        console.log(feed.items.length)
    } catch(error) {
        console.log("StackOverflow Fetch Failed!");
    }
    // not using redis on heroku
    fs.writeFileSync('stackoverflow.txt', JSON.stringify(jobs), 'utf8');
    // try {
    //     client.setAsync('stackoverflow', JSON.stringify(jobs));
    //     console.log('STACKOF FETCH COMPLETE!');
    // } catch(error) {
    //     return error
    // }
}; fetchSOJobs();

module.exports = fetchSOJobs;