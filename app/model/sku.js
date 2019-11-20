'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const { INTEGER, STRING } = DataTypes;
  const Sku = app.model.define('sku', {
    sku_id: {
      allowNull: false,
      primaryKey: true,
      type: INTEGER,
      autoIncrement: true,
      comment: 'SKU id',
    },
    product_id: {
      allowNull: false,
      type: INTEGER,
      defaultValue: 0,
      comment: '商品 id',
    },
    meta_id: {
      allowNull: true,
      type: INTEGER,
      comment: 'SKU 对应 meta 的 id',
    },
    image_src: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '关联图URL',
    },
    options: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '属性',
    },
    price: {
      allowNull: true,
      type: INTEGER,
      defaultValue: 0,
      comment: '单价',
    },
    stock: {
      allowNull: true,
      type: INTEGER,
      defaultValue: 0,
      comment: '库存',
    },
    cb_name: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '备案品名',
    },
    cb_unit: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '单位代码',
    },
    cb_code: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '备案的SKU代码',
    },
    cb_barcode: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '条线码',
    },
    cb_taxrate: {
      allowNull: true,
      type: INTEGER,
      comment: '税率, 单位万分之一',
      set(val) {
        this.setDataValue('cb_taxrate', val === null ? val : val * 10000);
      },
      get() {
        const taxrate = this.getDataValue('cb_taxrate');
        return taxrate ? taxrate / 10000 : taxrate;
      },
    },
    cb_country: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '源产国代码',
    },
    cb_warehouse: {
      allowNull: true,
      type: STRING,
      defaultValue: '',
      comment: '发货地',
    },
  }, {
    comment: 'SKU 表',
    indexs: [{
      fields: [ 'sku_id' ],
    }],
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Sku.associate = function() {
    Sku.belongsTo(app.model.Spu, {
      foreignKey: 'product_id',
      as: 'spu',
      constraints: false,
    });
  };
  return Sku;
};
