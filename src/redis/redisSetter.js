const { redisClient } = require('./redis');

exports.hmsetAsync = async ({ key, data, client = redisClient }) => {
  try {
    return { result: await client.hmsetAsync(key, data) };
  } catch (error) {
    return { error };
  }
};
