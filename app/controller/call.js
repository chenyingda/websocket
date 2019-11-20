'use strict'
;
const WebSocket = require('ws');
module.exports = app => {
  return class callController extends app.Controller {
    async index() {
      const ws = new WebSocket('wss://cydxbc123.natapp1.cc');
      ws.on('open', function open() {
        this.ctx.logger.info('socket connected');
      });
    }
  };
};
