'use strict';
module.exports = () => {
  /*
    const err = new Error('message') // 展示给前端的错误信息
    err.status = 400 // 这个是返回的状态码
    err.code = 4001 // 这个是详细的错误码，如果不设置此字段，则取状态码
     */
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const status = parseInt(err.status || 500);
      const code = err.code || status;
      const message = status >= 500 ? 'Sorry,服务器出了点小问题' : err.message;

      // log
      // 记录一遍错误的详细请求信息
      const errName = err.name;
      const errMsg = err.message;
      // const errStack = err.stack.substring(err.stack.indexOf('\n') + 1);
      const log = {
        method: ctx.method,
        path: ctx.path,
        query: ctx.query,
        body: ctx.request.body,
        status,
        code,
        errName,
        errMsg,
        // errStack
      };
      if (status >= 500) {
        ctx.logger.error(JSON.stringify(log, null, 2));
        ctx.logger.error(err);
      } else {
        ctx.logger.info(JSON.stringify(log, null, 2));
      }

      // return
      ctx.body = {
        err_code: code,
        err_msg: message,
      };
      ctx.status = status;
    }
  };
};

