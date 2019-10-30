import request from '../lib/request';
import env from '../lib/env';

/**
 * 后台接口
 */
const serverApi = {
  /**
   * 获取小程序配置
   * @param params
   * @returns {*}
   */
  config: () => request.get(env.staticPath + '/mini-program/config.json', { t: Date.now() }),

  /**
   * 提交意见反馈
   * @param params
   * @returns {*}
   */
  submitFeedback: params => request.post(env.apiPath + '/Feedback/add', params)
};

export default serverApi;
