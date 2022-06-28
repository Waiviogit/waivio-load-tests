const _ = require('lodash');
const { requestTest, getCache } = require('./test-helper');
const { ENGINE_NODES_FOR_TEST, ENGINE_BODY_PARAMS } = require('../constants/hive-engine');
const { redisSetter } = require('../redis');
const { REDIS_KEY_ENGINE } = require('../constants/hive-engine');

exports.testHiveEngineBlockchain = async () => {
  const testResults = await requestTest({
    nodeList: ENGINE_NODES_FOR_TEST.BLOCKCHAIN,
    body: ENGINE_BODY_PARAMS.GET_BLOCK,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY_ENGINE.BLOCKCHAIN, data: getCache(nodes),
  });
};

exports.testHiveEngineContracts = async () => {
  const testResults = await requestTest({
    nodeList: ENGINE_NODES_FOR_TEST.CONTRACTS,
    body: ENGINE_BODY_PARAMS.TOKENS,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY_ENGINE.CONTRACTS, data: getCache(nodes),
  });
};
