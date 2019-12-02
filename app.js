'use strict';

const apm = require('elastic-apm-node');

module.exports = app => {
  app.beforeStart(async () => {
    await app.model.sync();
    process.on('uncaughtException', function(err) {
      throw err;
    });
    process.on('unhandleRejection', function(err) {
      console.log('unhandleRejection in app', err);
    });
  });
  app.messenger.once('egg-ready', () => {
    app.logger.info('server ready');
    apm.start({
      serviceName: 'apm-demo',
      serverUrl: 'http://localhost:8200',
    });
  });

}
;
