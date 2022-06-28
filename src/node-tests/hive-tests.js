const _ = require('lodash');
const { redisSetter } = require('../redis');
const { NODES_FOR_TEST, BODY_PARAMS, REDIS_KEY } = require('../constants/hiveTestParams');
const { requestTest, getCache } = require('./test-helper');

exports.testBlockchain = async () => {
  const testResults = await requestTest({
    nodeList: NODES_FOR_TEST.BLOCK,
    body: BODY_PARAMS.BLOCK,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.BLOCK, data: getCache(nodes),
  });
};

exports.testVoteCommentsAccount = async () => {
  const testAccount = await requestTest({
    nodeList: NODES_FOR_TEST.REGULAR,
    body: BODY_PARAMS.ACCOUNT,
  });
  const testTrending = await requestTest({
    nodeList: NODES_FOR_TEST.REGULAR,
    body: BODY_PARAMS.TRENDING,
  });
  const testFollowers = await requestTest({
    nodeList: NODES_FOR_TEST.REGULAR,
    body: BODY_PARAMS.FOLLOWERS,
  });

  const merged = testAccount.map((el) => {
    const trending = testTrending.find((t) => t.url === el.url);
    const followers = testFollowers.find((f) => f.url === el.url);
    return {
      url: el.url,
      errors: el.errors + trending.errors + followers.errors,
      success: el.success + trending.success + followers.success,
      latency: (el.latency + trending.latency + followers.latency) / 3,
    };
  });

  const nodes = _.orderBy(merged, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.POST, data: getCache(nodes),
  });
};

exports.testHistory = async () => {
  const testResults = await requestTest({
    nodeList: NODES_FOR_TEST.HISTORY,
    body: BODY_PARAMS.HISTORY,
  });

  const nodes = _.orderBy(testResults, ['success', 'latency'], ['desc', 'asc']);
  await redisSetter.hmsetAsync({
    key: REDIS_KEY.HISTORY, data: getCache(nodes),
  });
};
