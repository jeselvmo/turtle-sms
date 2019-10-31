/**
 *
 * 环境配置信息
 *
 */

// 开发环境
const devServer = 'https://localhost:8360';
const development = {
  name: 'development',
  apiPath: `${devServer}/api`
};

// 生产环境配置
const prodServer = 'https://zaifumo.kecoyo.com';
const production = {
  name: 'production',
  apiPath: `${prodServer}/api`
};

// const env = development;
const env = production;
console.log('env:', env.name);
module.exports = env;
