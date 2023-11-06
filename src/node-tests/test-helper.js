const autocannon = require('autocannon');
const Hived = require('@hiveio/dhive');
const _ = require('lodash');
const { NODES_FOR_TEST } = require('../constants/hiveTestParams');

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

const hivedRequest = async ({
  url, options, api, method, args = [], timeout = 5000, cbTest,
}) => {
  let timer;
  const client = new Hived.Client(url, options);

  // Function to execute the Hived request
  const executeRequest = async () => {
    try {
      const startTime = Date.now();
      let result;
      if (api) {
        result = await client[api][method](...args);
      } else {
        result = await client[method](...args);
      }

      const endTime = Date.now();
      const executionTime = endTime - startTime;
      clearTimeout(timer); // Clear the timeout since the request completed successfully
      const test = cbTest(result);

      return { result, executionTime, test };
    } catch (error) {
      clearTimeout(timer); // Clear the timeout in case of an error
      return { error, executionTime: null };
    }
  };

  try {
    const result = await Promise.race([
      executeRequest(),
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out'));
        }, timeout);
      }),
    ]);

    return result;
  } catch (error) {
    return { error };
  }
};

const formatData = (data) => data.reduce((result, item) => {
  const existingItem = result.find((x) => x.url === item.url);
  if (existingItem) {
    existingItem.success += item.success ? 1 : 0;
    existingItem.errors += item.success ? 0 : 1;
    if (item.executionTime) {
      existingItem.executionTimeSum += item.executionTime;
    }
    existingItem.count += 1;
  } else {
    result.push({
      url: item.url,
      success: item.success ? 1 : 0,
      errors: item.success ? 0 : 1,
      executionTimeSum: item.executionTime ? item.executionTime : 0,
      count: 1,
    });
  }
  return result;
}, []);

const finalFormatData = (formattedData) => formattedData.map((item) => ({
  ...item,
  latency: item.executionTimeSum / item.count,
}));

exports.newTestNodes = async ({ nodes, testData }) => {
  const results = [];
  for (const url of nodes) {
    for (const testChunk of testData) {
      const { executionTime, test } = await hivedRequest({ url, ...testChunk });
      results.push({
        success: !!test,
        executionTime,
        url,
        scope: testChunk.scope,
      });
    }
  }
  return finalFormatData(formatData(results));
};
