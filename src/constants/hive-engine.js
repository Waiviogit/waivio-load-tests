const MAIN_ENGINE_NODES = [
  'https://api.hive-engine.com/rpc',
  'https://api2.hive-engine.com/rpc',
  'https://herpc.dtools.dev',
  'https://us.engine.rishipanthee.com',
  'https://ha.herpc.dtools.dev',
];

const ENGINE_ENDPOINTS = {
  BLOCKCHAIN: '/blockchain',
  CONTRACTS: '/contracts',
};

exports.REDIS_KEY_ENGINE = {
  BLOCKCHAIN: 'test:engine:blockchain',
  CONTRACTS: 'test:engine:contracts',
};

exports.ENGINE_NODES_FOR_TEST = {
  BLOCKCHAIN: MAIN_ENGINE_NODES.map((url) => `${url}${ENGINE_ENDPOINTS.BLOCKCHAIN}`),
  CONTRACTS: MAIN_ENGINE_NODES.map((url) => `${url}${ENGINE_ENDPOINTS.CONTRACTS}`),
};

exports.ENGINE_BODY_PARAMS = {
  GET_BLOCK: {
    jsonrpc: '2.0',
    method: 'getBlockInfo',
    params: { blockNumber: 18667364 },
    id: 'ssc-mainnet-hive',
  },
  TOKENS: {
    jsonrpc: '2.0',
    method: 'find',
    params: {
      contract: 'tokens',
      table: 'tokens',
      query: {

      },
      offset: 0,
      limit: 1000,
    },
    id: 'ssc-mainnet-hive',
  },
};
