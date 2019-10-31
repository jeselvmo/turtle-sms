import wxUtils from './wx-utils';

const request = {
  get(url, data) {
    return request.sendData({ method: 'GET', url, data });
  },

  post(url, data) {
    return request.sendData({ method: 'POST', url, data });
  },

  sendData(params) {
    return wxUtils
      .request({
        method: params.method,
        url: params.url,
        data: params.data,
        header: {
          'Content-Type': 'application/json'
          // Authorization: utils.token
        }
      })
      .then(result => result.data);
  },

  uploadFile(url, name, filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        name,
        filePath,
        header: {
          // Authorization: utils.token
        },
        success: res => resolve(JSON.parse(res.data)),
        fail: err => reject(err)
      });
    });
  }
};

export default request;
