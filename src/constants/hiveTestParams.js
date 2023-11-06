exports.REDIS_KEY = {
  BLOCK: 'test:hive:blocks',
  POST: 'test:hive:post',
  HISTORY: 'test:hive:history',
};

exports.NODES_FOR_TEST = {
  BLOCK: [
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
    'https://api.deathwing.me',
    'https://api.openhive.network',
    'https://techcoderx.com',
    'https://anyx.io',
    'https://hive-api.3speak.tv',
    'https://rpc.mahdiyari.info',

    'https://rpc.ausbit.dev',
    'https://hive.roelandp.nl',
    'https://hive-api.arcange.eu',
    'https://hived.emre.sh',
  ],
  HISTORY: [
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

exports.REGULAR_TEST_DATA =  [
  {
    api: 'database',
    method: 'call',
    args: ['get_content', ['arcange', 'hive-finance-20231102-en']],
    scope: 'posts',
    cbTest: (result) => !!(result?.author && result?.permlink && result?.body)
  },
  {
    api: 'database',
    method: 'call',
    args: ['get_state', ['hive-133987/@arcange/hive-finance-20231102-en']],
    scope: 'posts',
    cbTest: (result) => !!(result?.accounts && result?.content)
  },
  {
    method: 'call',
    args: ['database_api', 'find_comments', { comments: [['hiveio', 'around-the-hive-reflections']] }],
    scope: 'posts',
    cbTest: (result) => !!(Array.isArray(result?.comments) && result?.comments?.length)
  },
  {
    api: 'database',
    method: 'call',
    args: ['get_discussions_by_comments', [{ start_author: 'arcange', start_permlink: 'hive-finance-20231102-en', limit: 10 }]],
    scope: 'posts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length === 10)
  },
  {
    api: 'database',
    method: 'getDiscussions',
    args: ['hot', { limit: 10 }],
    scope: 'posts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length === 10)
  },
  {
    api: 'database',
    method: 'getAccounts',
    args: [['arcange']],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result[0]?.name === 'arcange')
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_following', ['arcange', '', 'blog', 10]],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result[0]?.follower === 'arcange')
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_followers', ['arcange', '', 'blog', 10]],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result[0]?.following === 'arcange')
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_follow_count', ['arcange']],
    scope: 'accounts',
    cbTest: (result) => (result?.account === 'arcange')
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_account_reputations', ['arcange', 10]],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result[0]?.account === 'arcange')
  },
  {
    method: 'call',
    args: ['database_api', 'find_vesting_delegations', { account: 'waivio.updates' }],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result?.delegations))
  },
  {
    method: 'call',
    args: ['database_api', 'find_vesting_delegation_expirations', { account: 'waivio.updates' }],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result?.delegations))
  },
  {
    api: 'database',
    method: 'getAccountHistory',
    args: ['waivio', -1, 1000],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length)
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_reward_fund', ['post']],
    scope: 'block',
    cbTest: (result) => !!(result?.reward_balance && result?.recent_claims)
  },
  {
    method: 'call',
    args: ['condenser_api', 'get_current_median_history_price', []],
    scope: 'block',
    cbTest: (result) => !!(result?.base && result?.quote)
  },
  {
    api: 'database',
    method: 'call',
    args: ['get_block', [79405337]],
    scope: 'block',
    cbTest: (result) => !!(Array.isArray(result?.transactions)&& result?.transactions?.length)
  },
];

exports.BLOCK_TEST_DATA = [
  {
    api: 'database',
    method: 'call',
    args: ['get_block', [79405337]],
    scope: 'block',
    cbTest: (result) => !!(Array.isArray(result?.transactions)&& result?.transactions?.length)
  },
  {
    api: 'database',
    method: 'call',
    args: ['get_block', [79405338]],
    scope: 'block',
    cbTest: (result) => !!(Array.isArray(result?.transactions)&& result?.transactions?.length)
  },
  {
    api: 'database',
    method: 'call',
    args: ['get_block', [79405339]],
    scope: 'block',
    cbTest: (result) => !!(Array.isArray(result?.transactions)&& result?.transactions?.length)
  },
]


exports.HISTORY_TEST_DATA = [
  {
    api: 'database',
    method: 'getAccountHistory',
    args: ['waivio', -1, 1000],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length)
  },
  {
    api: 'database',
    method: 'getAccountHistory',
    args: ['flowmaster', -1, 1000],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length)
  },
  {
    api: 'database',
    method: 'getAccountHistory',
    args: ['wiv01', -1, 1000],
    scope: 'accounts',
    cbTest: (result) => !!(Array.isArray(result) && result?.length)
  },
]
