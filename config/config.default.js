/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1740292932072_2024';

  // add your middleware config here
  config.middleware = [ 'response' ];

  config.response = {
    successCode: 0, // 自定义成功码
    errorCode: 500, // 默认错误码
    hideStack: true, // 生产环境隐藏堆栈
    encrypt: false, // 是否加密响应数据
  };

  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: '626488xqy',
    define: {
      freezeTableName: true, // 禁止自动修改表名
      timestamps: true, // 自动添加 createdAt 和 updatedAt
      underscored: true, // 使用下划线字段命名风格
    },
    timezone: '+08:00', // 设置中国时区
  };

  config.jwt = {
    secret: 'blog',
    expiresIn: '8h',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ 'http://127.0.0.1' ],
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
