const axios = require('axios');
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient();
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('connect', () => console.log('Redis client connected'));

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
    console.log('GITHUB FETCH COMPLETE!');
    client.set('github', JSON.stringify(jobs), redis.print);
    // const success = await setAsync('gihub', JSON.stringify(jobs));
    // console.log({success});
    client.get('github', (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(result);
    });
}

fetchGithubJobs();


module.exports = fetchGithubJobs;
