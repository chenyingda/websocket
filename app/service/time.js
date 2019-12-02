'use strict'
;

module.exports = app => {
  return class timeService extends app.Service {
    async setTime() {
      setTimeout(() => {

      }, 4000);
    }
  };
}
;
