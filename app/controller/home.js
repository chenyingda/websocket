'use strict'
;
const Promise = require('bluebird');
const skus_arr = require('../util/sku');
module.exports = app => {
  class HomeController extends app.Controller {
    async index() {
      const { ctx } = this;
      const { Sku, Spu } = ctx.model;
      // const result = await app.model.query('select * from sku where sku_id = 5264325');
      // const result = await app.model.query("SELECT `sku`.`sku_id`, `sku`.`product_id`, `sku`.`meta_id`, `sku`.`image_src`, `sku`.`options`, `sku`.`price`, `sku`.`stock`, `sku`.`cb_name`, `sku`.`cb_unit`, `sku`.`cb_code`, `sku`.`cb_barcode`, `sku`.`cb_taxrate`, `sku`.`cb_country`, `sku`.`cb_warehouse`, `sku`.`created_at`, `spu`.`product_id` AS `spu.product_id`, `spu`.`meta_id` AS `spu.meta_id`, `spu`.`image_src` AS `spu.image_src`, `spu`.`handle` AS `spu.handle`, `spu`.`name` AS `spu.name`, `spu`.`brand_name` AS `spu.brand_name`, `spu`.`types` AS `spu.types`, `spu`.`visibility` AS `spu.visibility`, `spu`.`created_at` AS `spu.created_at` FROM `sku` AS `sku` LEFT OUTER JOIN `spu` AS `spu` ON `sku`.`product_id` = `spu`.`product_id` AND (`spu`.`deleted_at` > '2019-11-07 15:33:52' OR `spu`.`deleted_at` IS NULL) WHERE ((`sku`.`deleted_at` > '2019-11-07 15:33:52' OR `sku`.`deleted_at` IS NULL) AND `sku`.`sku_id` = 5264325)");
      const result = await Sku.findAll({
        where: {
          sku_id: '5264325',
        },
        distinct: true,
        include: [{
          model: Spu,
          as: 'spu',
          // where: {
          //   product_id: '1139007',
          // },
          attributes: [ 'handle', 'name' ],
        }],
      });
      ctx.body = result;
    }

    async deadLock() {
      const { ctx } = this;
      const { Sku } = ctx.model;
      const skus = await Sku.findAll({
        raw: true,
      });
      await Promise.all(skus.map(async sku => {
        await Sku.upsert(sku, {
          fields: [ 'sku_id', 'product_id', 'options', 'stock', 'price' ],
        });
      }));
      ctx.body = 'xxx';
    }

    async destroy() {
      // promise.mapseries 并发且顺序执行
      // 缓存机制下 数据库不会重新磁盘io 而是直接读取服务器缓存
      const { ctx } = this;
      const { Sku } = ctx.model;
      let t;
      const result_arr = [];

      // const { Op } = this.app.Sequelize;
      try {
        // const skus = await Sku.findAll({
        //   raw: true,
        //   transaction: t,
        //   limit: 100,
        // });]
        const skus = [];
        for (let i = 0; i < skus_arr.length; i++) {
          skus.push({ sku_id: skus_arr[i] });
        }
        await Promise.all(skus.map(async sku => {
          t = await app.model.transaction();
          try {
            await Sku.upsert(sku, {
              fields: [ 'sku_id', 'product_id', 'options', 'stock', 'price' ],
              transaction: t,
            });
            result_arr.push(sku.sku_id);
            await t.commit();
          } catch (err) {
            await t.rollback();
          }
        }));
      } catch (err) {
        console.log('this is err', err);
        // await t.rollback();
      }
      ctx.body = {
        code: 200,
        data: JSON.stringify(result_arr) === JSON.stringify(skus_arr),
        result_arr,
      };
    }

    async testPromise() {
      const { ctx } = this;
      const { Sku } = ctx.model;
      const skus = await Sku.findAll({
        offset: 0,
        limit: 100,
        raw: true,
        attributes: [ 'sku_id' ],
      });
      const arr = skus.map(sku => {
        return sku.sku_id;
      });
      await Promise.all(arr.map(async sku_id => {
        await this.ctx.model.Sku.findOne({ where: { sku_id } });
      }));
      ctx.body = {
        code: 200,
        data: arr,
      };
    }

    async testThrow() {
      await Promise.all([ 1, 2, 3 ].map(id => {
        try {
          if (id === 1) {
            throw new Error('fail');
          } else {
            console.log('this is ids', id);
          }
        } catch (err) {
          throw err;
        }
      }));
    }

    async cors() {
      // ctx.set('Access-Control-Allow-Credentials', true);
      const { ctx } = this;
      const res = ctx;
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Headers', 'X-Requested-With');
      res.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.set('X-Powered-By', ' 3.2.1');
      res.set('Content-Type', 'application/json;charset=utf-8');
      console.log('this is customer', ctx.session.customer);
      res.body = {
        code: 200,
        data: 'cyd',
      };
      // ctx.session.customer = 'cyd';
      // ctx.set('Access-Control-Allow-Credentials', true);
      // ctx.body = 200;
    }

    async setTime() {
      //
      const { ctx } = this;
      setTimeout(() => {
        ctx.set();
      }, 4000);
    }

    async getTime() {
      //
      const { ctx } = this;
      const result = await ctx.curl('http://127.0.0.1:7001/home/setTime', {
        method: 'GET',
        dataType: 'json',
        timeout: 7000,
      });
      console.log('this is result', result);
      const data = result.data;
      ctx.body = data;
    }

    async testTryCatch() {
      const { ctx } = this;
      try {
        // throw { error: Promise.reject(new Error({ name: 'cyd' })) };
        throw { error: new Error('cyd') };
      } catch (error) {
        if (!error.noLog) {
          // console.log('this is error', error);
          // console.log('cyd');
        }
      }
      // throw new Error('fail');
      const data = await ctx.curl('http://cususa.kkk.com');
      console.log('data', data);
      ctx.body = 200;
    }

    async connectHandOut() {
      const { ctx } = this;
      const arr = [];
      for (let i = 0; i < 100; i++) {
        arr.push(i);
      }
      await Promise.all(arr.map(async () => {
        await ctx.curl('https://www.baidu.com', {
          method: 'GET',
        });
      }));
    }
  }
  return HomeController;
}
;
