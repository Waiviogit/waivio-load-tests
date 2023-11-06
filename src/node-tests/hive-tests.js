const _ = require('lodash');
const { redisSetter } = require('../redis');
const { NODES_FOR_TEST,  REDIS_KEY, BLOCK_TEST_DATA, REGULAR_TEST_DATA, HISTORY_TEST_DATA } = require('../constants/hiveTestParams');
const { getCache, newTestNodes } = require('./test-helper');

exports.testBlockchain = async () => {
  const testResults = await newTestNodes({
    nodes : NODES_FOR_TEST.REGULAR,
    testData: BLOCK_TEST_DATA,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.BLOCK, data: getCache(nodes),
  });
};

exports.testVoteCommentsAccount = async () => {
  const testResults = await newTestNodes({
    nodes : NODES_FOR_TEST.REGULAR,
    testData: REGULAR_TEST_DATA,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.POST, data: getCache(nodes),
  });
};

exports.testHistory = async () => {
  const testResults = await newTestNodes({
    nodes : NODES_FOR_TEST.REGULAR,
    testData: HISTORY_TEST_DATA,
  });


  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.HISTORY, data: getCache(nodes),
  });
};
