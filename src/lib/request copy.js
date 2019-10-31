import utils from './utils';
import wxUtils from './wx-utils';
import ApiError from '../error/api-error';

const request = {
  get(url, data) {
    return request.send({ method: 'GET', url, data });
  },

  post(url, data) {
    return request.send({ method: 'POST', url, data });
  },

  send(params) {
    return new Promise((resolve, reject) => {
      request
        .sendData(params)
        .then(resolve)
        .catch(err => {
          if (err instanceof ApiError) {
            if (err.code === -110) {
              Promise.resolve()
                .then(result => utils.login())
                .then(result => request.send(params))
                .then(resolve)
                .catch(reject);
            } else if (err.code === -6) {
              Promise.resolve()
                .then(result => utils.relogin())
                .then(result => request.send(params))
                .then(resolve)
                .catch(reject);
            } else {
              reject(err);
            }
          } else {
            reject(err);
          }
        });
    });
  },

  sendData(params) {
    return wxUtils
      .request({
        method: params.method,
        url: params.url,
        data: params.data,
        header: {
          'Content-Type': 'application/json',
          Authorization: utils.token
        }
      })
      .then(result => {
        const data = result.data;
        let code = Number(data.code);
        if (code >= 0) {
          return data;
        } else if (code < 0) {
          throw new ApiError(data);
        } else {
          return data;
        }
      });
  },

  uploadFile(url, name, filePath) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        name,
        filePath,
        header: {
          Authorization: utils.token
        },
        success: res => resolve(JSON.parse(res.data)),
        fail: err => reject(err)
      });
    });
  }
};

export default request;
