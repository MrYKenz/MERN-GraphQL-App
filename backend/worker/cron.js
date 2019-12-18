const CronJob = require('cron').CronJob;
const fetchGithubJobs = require('./tasks/github');

new CronJob('30 6 * * * *', fetchGithubJobs, null, 
true, 'Europe/London');

// create other cron jobs