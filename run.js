'use strict';
const egg = require('egg');

function normalizePort(val) {
  const listenPort = parseInt(val, 10);

  if (isNaN(listenPort)) {
    return val;
  }

  if (listenPort >= 0) {
    return listenPort;
  }

  return false;
}

const port = normalizePort(process.env.PORT) || 3000;

console.log('this is port', port);

egg.start({ ignoreWarning: true })
  .then(app => {
    app.listen(port);
    app.logger.info(`server running  on ${port} ...`);
  });
