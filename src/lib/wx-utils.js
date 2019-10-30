// 用Promise封装小程序的其他API
function promisify(api) {
  return (options, ...params) => {
    return new Promise((resolve, reject) => {
      api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
    });
  };
}

const wxUtils = {
  // 查看是否授权
  getSetting: promisify(wx.getSetting),
  // 获取用户信息
  getUserInfo: promisify(wx.getUserInfo),
  // 登录
  login: promisify(wx.login),
  // 检测session
  checkSession: promisify(wx.checkSession),
  // 请求数据
  request: promisify(wx.request)
};

export default wxUtils;
