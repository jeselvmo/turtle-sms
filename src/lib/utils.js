import wepy from 'wepy';
import userApi from '../apis/userApi';
import dataChanged from './data-changed';
import wxUtils from './wx-utils';
import { updateWxUserInfo } from '../store/actions';

const TOKEN = 'token';
const TOKEN_TIME = 'token_time';

const launchOptions = wx.getLaunchOptionsSync();

const utils = {
  showLoading() {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    });
  },
  hideLoading() {
    wx.hideLoading();
  },
  showToast(title, icon) {
    wx.showToast({
      icon: icon || 'none',
      title: title || '',
      duration: 2000
    });
  },
  showSuccess(title) {
    return new Promise((resolve, reject) => {
      wx.showToast({
        icon: 'success',
        title: title || 'undefined',
        duration: 2000,
        success: res => {
          setTimeout(() => {
            resolve(res);
          }, 2000);
        },
        fail: () => {
          reject(new Error('Error: wx.showToast'));
        }
      });
    });
  },
  alert(content) {
    wx.showModal({
      title: '提示',
      content,
      showCancel: false
    });
  },
  html2Escape(sHtml) {
    return sHtml.replace(/[<>&"]/g, function(c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c];
    });
  },
  escape2Html(str) {
    var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
      return arrEntities[t];
    });
  },
  differenceYears(startDateStr, endDateStr) {
    var sDate = new Date(Date.parse(startDateStr.replace(/-/g, '/')));
    var eDate = new Date(Date.parse(endDateStr.replace(/-/g, '/')));
    var time = eDate.getTime() - sDate.getTime(),
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
    return year;
  },
  // 日期格式化
  formatDate(date = new Date(), fmt = 'yyyy-MM-dd') {
    // 支持其他格式
    if (typeof date === 'string' || typeof date === 'number') {
      date = new Date(date);
    }

    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  },
  wxRequest(params) {
    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        success: resolve,
        fail: reject
      });
    });
  },
  // 授权登录
  login(detail) {
    let params = {};
    if (detail) {
      params = {
        iv: encodeURIComponent(detail.iv),
        encryptedData: encodeURIComponent(detail.encryptedData)
      };
    }
    return Promise.resolve()
      .then(() => wxUtils.login())
      .then(result => userApi.login({ code: result.code, ...params }))
      .then(result => {
        utils.token = result.data.token;
        utils.tokenTime = result.data.token_time;

        if (detail && detail.userInfo) {
          wepy.$dispatch(updateWxUserInfo(detail.userInfo));
        }

        dataChanged.home = true;
        dataChanged.course = true;
        dataChanged.creation = true;
        dataChanged.my = true;
        dataChanged.courseDetail = true;

        return true;
      });
  },

  relogin() {
    return Promise.resolve()
      .then(result => wxUtils.getUserInfo())
      .then(result => utils.login(result));
  },

  // 是否登录
  isLogin() {
    return !!utils.token;
  },
  requestPayment(data) {
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        ...data,
        success: res => {
          resolve('支付成功');
        },
        fail: () => {
          reject(new Error('支付失败'));
        }
      });
    });
  },
  needLogin(callback) {
    if (utils.isLogin()) {
      callback();
    } else {
      utils.showToast('请先登录');
    }
  },
  navigateBack(delta = 1) {
    wx.navigateBack({
      delta
    });
  },
  navigateTo(url) {
    wx.navigateTo({
      url
    });
  },
  navigateToNeedLogin(url) {
    utils.needLogin(() => {
      utils.navigateTo(url);
    });
  },
  reLaunch(url) {
    return utils.promisify(wx.reLaunch)({
      url
    });
  },
  // 获取上一级页面
  getParentPage($this) {
    let pages = $this.getCurrentPages();
    if (pages.length > 1) {
      return pages[pages.length - 2];
    }
    return null;
  },
  canIUse() {
    return wx.canIUse('button.open-type.getUserInfo');
  },
  isNull(val) {
    return val == null || val === undefined;
  },
  isEmpty(val) {
    return val === '' || val.length === 0;
  },
  isMobile(val) {
    return /^(1([3456789]))\d{9}$/.test(val);
  },
  isAmount(val) {
    return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(val);
  },
  // 用Promise封装小程序的其他API
  promisify(api) {
    return (options, ...params) => {
      return new Promise((resolve, reject) => {
        api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
      });
    };
  },
  px2rem(px) {
    return Math.round((750 / wx.getSystemInfoSync().screenWidth) * px);
  },
  rem2px(rem) {
    return Math.round((wx.getSystemInfoSync().screenWidth / 750) * rem);
  },
  getImageInfo(src) {
    return utils.promisify(wx.getImageInfo)({
      src
    });
  },
  setNavigationBarTitle(title) {
    wx.setNavigationBarTitle({
      title
    });
  },
  // 延迟执行
  delay(time = 500) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  },
  set isRendererSupported(isRendererSupported) {
    wx.setStorageSync('isRendererSupported', isRendererSupported);
  },
  get isRendererSupported() {
    return wx.getStorageSync('isRendererSupported');
  },
  //
  isOfficialAccountScene() {
    return [1011, 1047, 1089, 1038].includes(launchOptions.scene);
  },
  /**
   * 验证Token
   */
  validToken() {
    return utils.token && utils.tokenTime && utils.tokenTime > Date.now();
  },
  // 检查是否授权获取用户信息
  isAuthUserInfo() {
    return wxUtils.getSetting().then(result => {
      return result.authSetting['scope.userInfo'] || false;
    });
  },
  async checkWechatIsSubscribe() {
    let result = await userApi.checkWechatIsSubscribe();
    return result.data.is_subscribe === 'Y';
  },
  // ///////////////////////////
  // Token
  get token() {
    return wx.getStorageSync(TOKEN);
  },
  set token(token) {
    wx.setStorageSync(TOKEN, token);
  },
  // ///////////////////////////
  // tokenTime
  get tokenTime() {
    return wx.getStorageSync(TOKEN_TIME);
  },
  set tokenTime(tokenTime) {
    wx.setStorageSync(TOKEN_TIME, tokenTime * 1000);
  }
};

export default utils;
