/**
 *
 * 环境配置信息
 *
 */

// 开发环境
const devServer = 'https://devbeecode.ljlx.com';
const devCdnServer = `https://devbeecode.ljlx.com`;
const development = {
    name: 'development',
    apiPath: `${devServer}/api`,
    scratchPath: `${devServer}/beemisc/scratch`,
    webPath: `${devServer}/beemisc/web`,

    imgUrl: `${devCdnServer}`,

    reslibPath: `${devCdnServer}/beemisc/reslib`,
    staticPath: `${devCdnServer}/beemisc/static`,
    libsPath: `${devCdnServer}/beemisc/libs`
};

// 生产环境配置
const prodCdnServer = `https://cdnbeecode.ljlx.com/Obj_BeeCode`;
const prodServer = 'https://beecode.ljlx.com';
const production = {
    name: 'production',
    apiPath: `${prodServer}/api`,
    scratchPath: `${prodServer}/beemisc/scratch`,
    webPath: `${prodServer}/beemisc/web`,

    imgUrl: '',

    reslibPath: `${prodCdnServer}/beemisc/reslib`,
    staticPath: `${prodCdnServer}/beemisc/static`,
    libsPath: `${prodCdnServer}/beemisc/libs`
};

// const env = development;
const env = production;
console.log('env:', env.name);
module.exports = env;
