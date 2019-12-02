'use strict'
;
const _ = require('lodash');
module.exports = app => {
  return class sqlController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { Op } = app.Sequelize;
      const skus = await ctx.model.Sku.findAndCountAll({
        where: {
          sku_id: {
            [Op.like]: '%1%',
          },
        },
      });
      const data = _.floor((313902 + 0 - 255382) / 100, 2);

      console.log('this is data', data);
      ctx.body = skus;
    }
  };
}
;
