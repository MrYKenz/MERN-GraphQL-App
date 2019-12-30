const CronJob = require('cron').CronJob;
const fetchGithubJobs = require('./tasks/github');
const fetchSOJobs = require('./tasks/stackoverflow');

new CronJob('30 6 * * * *', fetchGithubJobs, null, 
true, 'Europe/London');

new CronJob('50 6 * * * *', fetchSOJobs, null, 
true, 'Europe/London');
