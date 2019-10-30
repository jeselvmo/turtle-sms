import request from '../lib/request';
import env from '../lib/env';

/**
 * 自由创作管理Api
 */
const creationApi = {
  /**
   * 我的创作
   */
  myCreation: () => request.get(env.apiPath + '/Creation/myCreation'),

  /**
   * 创作列表
   * @param {object} params {type, page, order}
   */
  creationList: params => request.get(env.apiPath + '/Creation/creationList', params),

  /**
   * tags
   * @param params
   * @returns {*}
   */
  tagList: params => request.get(env.apiPath + '/Creation/tagList', params),

  /**
   * 下架作品
   * @param {string} ids 作品ID，多个以逗号(,)隔开
   * @returns {*}
   */
  unpublish: ids => request.get(env.apiPath + '/Creation/unpublish', { ids }),

  /**
   * 删除作品
   * @param {string} ids 作品ID，多个以逗号(,)隔开
   * @returns {*}
   */
  delete: ids => request.get(env.apiPath + '/Creation/delete', { ids }),

  /**
   * 作品信息，需要登录
   * @param id
   * @returns {*}
   */
  info: id => request.get(env.apiPath + '/Creation/info', { id }),

  /**
   * 作品信息
   * @param id
   * @returns {*}
   */
  creationInfo: id => request.get(env.apiPath + '/Creation/creationInfo', { id }),

  /**
   * 热门作品列表
   * @param params {page}
   * @returns {*}
   */
  hot: params => request.get(env.apiPath + '/Creation/hot', params),

  /**
   * 热门作品详情
   * @param params {id}
   * @returns {*}
   */
  hotDetail: id => request.get(env.apiPath + '/Creation/hotDetail', { id })
};

export default creationApi;
