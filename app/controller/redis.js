'use strict'
;

module.exports = app => {
  return class redisController extends app.Controller {
    async index() {
      const { ctx } = this;
      await app.redis.set('cyd', '1');
      const cyd = await app.redis.get('cyd');
      if (cyd === '1') {
        console.log('exist');
      }
      this.logger.info('ssss');
      ctx.body = {
        code: 200,
        data: {
          value: cyd,
          type: typeof cyd,
        },
      };
    }
  };
}
;
