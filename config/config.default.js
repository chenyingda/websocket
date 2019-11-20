'use strict';

// const whitelist = [
//   // images
//   '.jpg', '.jpeg', // image/jpeg
//   '.png', // image/png, image/x-png
//   '.gif', // image/gif
//   '.bmp', // image/bmp
//   '.wbmp', // image/vnd.wap.wbmp
//   '.webp',
//   '.tif',
//   '.psd',
//   // text
//   '.svg',
//   '.js', '.jsx',
//   '.json',
//   '.css', '.less',
//   '.html', '.htm',
//   '.xml',
//   // tar
//   '.zip',
//   '.gz', '.tgz', '.gzip',
//   // video
//   '.mp3',
//   '.mp4',
//   '.avi',
// ];


module.exports = appInfo => {
  const config = exports = {};
  console.log('process.env', process.env.TASK_STATUS);

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532600673558_1754';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    database: 'seqtest',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '123789fd',
    timezone: '+08:00',
    pool: { // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000,
    },
    // logging: false,
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      defaultScope: {
        attributes: {
          exclude: [ 'updated_at', 'deleted_at' ],
        },
      },
    },
  };

  config.redis = {
    client: {
      // Redis port
      port: 6379,
      // Redis host
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
    listen: {
      port: 7002,
    },
  };

  config.multipart = {
    whitelist: [
      '.jpg', '.jpeg', '.png', '.gif', '.bmp',
    ],
  };

  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs',
  };

  return config;
};
