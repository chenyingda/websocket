'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {

  const { router, controller } = app;
  // websocket
  router.get('/call/index', controller.call.index);

  // sequelize
  router.get('/home/index', controller.home.index);
  router.get('/home/deadlock', controller.home.deadLock);
  router.get('/home/destroy', controller.home.destroy);
  router.get('/home/testPromise', controller.home.testPromise);
  router.get('/home/testThrow', controller.home.testThrow);
  router.get('/home/cors', controller.home.cors);
  router.get('/home/setTime', controller.home.setTime);
  router.get('/home/getTime', controller.home.getTime);
  router.get('/home/testTryCatch', controller.home.testTryCatch);
  router.get('/home/connectHandOut', controller.home.connectHandOut);


  router.get('/sql/index', controller.sql.index);


  router.get('/redis/index', controller.redis.index);

  router.get('/apm/index', controller.apm.index);
};
