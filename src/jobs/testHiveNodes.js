const { CronJob } = require('cron');
const { testBlockchain, testHistory, testVoteCommentsAccount } = require('../node-tests/hive-tests');

const hiveNodeJob = async () => {
  console.info(`hiveNodeJob started ${new Date().toISOString()}`);
  console.time('hiveNodeJob finished in');
  await testBlockchain();
  await testHistory();
  await testVoteCommentsAccount();
  console.timeEnd('hiveNodeJob finished in');
};

const cronTime = process.env.NODE_ENV === 'production'
  ? '30 */1 * * *'
  : '0 */1 * * *';

exports.testHiveNodeJob = new CronJob(
  cronTime,
  hiveNodeJob,
  null,
  false,
  null,
  null,
  true,
);
