'use strict'
;
module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const { INTEGER, STRING, BOOLEAN } = DataTypes;
  return app.model.define('spu', {
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: '商品 id',
    },
    meta_id: {
      allowNull: true,
      type: INTEGER,
      defaultValue: 0,
      comment: '商品对应 meta 的 id',
    },
    image_src: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '头图URL',
    },
    handle: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: 'handle',
    },
    name: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '商品名称',
    },
    brand_name: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '品牌',
    },
    types: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '分类',
    },
    visibility: {
      allowNull: true,
      type: BOOLEAN,
      defaultValue: false,
      comment: '是否上架',
    },
  }, {
    comment: 'SPU 表',
    indexs: [{
      fields: [ 'name' ],
    }, {
      fields: [ 'brand_name' ],
    }, {
      fields: [ 'types' ],
    }],
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
};

