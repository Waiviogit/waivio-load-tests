const { CronJob } = require('cron');
const { testHiveEngineBlockchain, testHiveEngineContracts } = require('../node-tests/hive-engine-tests');

const hiveNodeEngineJob = async () => {
  console.info(`hiveEngineNodeJob started ${new Date().toISOString()}`);
  console.time('hiveEngineNodeJob finished in');
  await testHiveEngineBlockchain();
  await testHiveEngineContracts();
  console.timeEnd('hiveEngineNodeJob finished in');
};

const cronTime = process.env.NODE_ENV === 'production'
  ? '45 */1 * * *'
  : '15 */1 * * *';

exports.testHiveEngineNodeJob = new CronJob(
  cronTime,
  hiveNodeEngineJob,
  null,
  false,
  null,
  null,
  false,
);
