const CronJob = require('cron').CronJob;
const fetchGithubJobs = require('./tasks/github');

new CronJob('1 * * * * *', fetchGithubJobs, null, 
true, 'Europe/London');