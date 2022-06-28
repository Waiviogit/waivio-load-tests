const autocannon = require('autocannon');
const _ = require('lodash');

exports.requestTest = async ({ nodeList, body }) => {
  const testResults = [];
  for await (const url of nodeList) {
    const result = await autocannon({
      method: 'POST',
      url,
      duration: 10,
      amount: 10,
      body: JSON.stringify(body),
    });
    testResults.push({
      url,
      errors: result.errors,
      latency: result.latency.average,
      success: result['2xx'],
    });
  }
  return testResults;
};

exports.getCache = (nodes) => _.reduce(nodes, (acc, el) => {
  acc[el.url] = JSON.stringify(_.omit(el, ['url']));
  return acc;
}, { nodes: JSON.stringify(_.map(nodes, 'url')) });
