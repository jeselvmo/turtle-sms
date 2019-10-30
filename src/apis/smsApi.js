import request from '../lib/request';
import env from '../lib/env';

/**
 * 短信接口
 */
const smsApi = {
  /**
   * 短信列表
   */
  list: params => request.get(env.apiPath + '/sms/list', params)
};

export default smsApi;
