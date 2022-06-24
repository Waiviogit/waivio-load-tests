exports.REDIS_KEY = {
  BLOCK: 'test:blocks:hive',
  POST: 'test:post:hive',
  HISTORY: 'test:history:hive',
};

exports.NODES_FOR_TEST = {
  BLOCK: [
    'https://blocks.waivio.com',
    'https://api.hive.blog',
    'https://anyx.io',
    'https://api.openhive.network',
    'https://rpc.ausbit.dev',
    'https://hive.roelandp.nl',
    'https://api.c0ff33a.uk',
    'https://api.deathwing.me',
    'https://hive-api.arcange.eu',
    'https://hived.emre.sh',
    'https://techcoderx.com',
    'https://hived.privex.io',
    'https://api.pharesim.me',
  ],
  REGULAR: [
    'https://api.hive.blog',
    'https://anyx.io',
    'https://api.openhive.network',
    'https://rpc.ausbit.dev',
    'https://hive.roelandp.nl',
    'https://api.c0ff33a.uk',
    'https://api.deathwing.me',
    'https://hive-api.arcange.eu',
    'https://hived.emre.sh',
    'https://techcoderx.com',
    'https://hived.privex.io',
    'https://api.pharesim.me',
  ],
};

exports.BODY_PARAMS = {
  BLOCK: {
    jsonrpc: '2.0',
    method: 'condenser_api.get_block',
    params: [57243067],
    id: 1,
  },
  ACCOUNT: {
    jsonrpc: '2.0',
    method: 'condenser_api.get_accounts',
    params: [['hive', 'hiveio']],
    id: 1,
  },
  TRENDING: {
    jsonrpc: '2.0',
    method: 'condenser_api.get_discussions_by_trending',
    params: [{ tag: 'hive', limit: 5 }],
    id: 1,
  },
  FOLLOWERS: {
    jsonrpc: '2.0',
    method: 'condenser_api.get_followers',
    params: ['hiveio', null, 'blog', 10],
    id: 1,
  },
  HISTORY: {
    jsonrpc: '2.0',
    method: 'condenser_api.get_account_history',
    params: ['hiveio', -1, 100],
    id: 1,
  },
};
