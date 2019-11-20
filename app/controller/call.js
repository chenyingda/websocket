'use strict'
;
const WebSocket = require('ws');
module.exports = app => {
  return class callController extends app.Controller {
    async index() {
      // 这里的由于使用的是wss/ws协议, 并非用的是http协议, 所以当前socket一直保持连接, 如果没有一方主动断开的话, ws会一直监听message函数
      // 只要接收到来自客户端的信息, 服务端就会自动响应
      const wss = new WebSocket.Server({ server: this.app.server });
      wss.on('connection', function(ws) {
        ws.on('message', function(message) {
          ws.send(`get the message ${message}`);
          if (message.indexOf('method') > -1) {
            ws.close();
            console.log('socket close');
          }
        });
      });
    }
  };
};
