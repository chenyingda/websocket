'use strict';

module.exports = app => {
  return class subService extends app.Service {
    async zadd(key, score, member) {
      await app.redis.zadd(key, score, member);
      await app.redis.publish('chat', member);
    }
  };
};
