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
};
