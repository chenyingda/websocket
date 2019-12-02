'use strict'
;
// const apm = require('elastic-apm-node');
module.exports = app => {
  return class apmController extends app.Controller {
    async index() {
      // apm for test
      const { ctx } = this;
      ctx.logger.info('lllll');
      ctx.status = 500;
      // apm.start({
      //   logLevel: 'info',
      //   serviceName: 'sequelize-apm-demo ',
      //   serverUrl: 'http://localhost:8200',
      // });
    }
  };
}
;
