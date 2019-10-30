import request from "../lib/request";
import env from "../lib/env";

/**
 * 用户
 */
const userApi = {

    /**
     * 获取用户信息
     */
    getUserInfo: (params) => request.get(env.apiPath + '/user/getUserInfo', params),

    /**
     * 设置用户信息
     */
    setUserInfo: (params) => request.post(env.apiPath + '/user/setUserInfo', params),

    /**
     * 上传头像
     */
    setUserAvatar: (filePath) => request.uploadFile(env.apiPath + '/user/setUserInfo', 'avatar', filePath),

    /**
     * 登录
     */
    login: (params) => request.post(env.apiPath + '/login/minipLogin', params),

    /**
     * 判断用户是否关注公众号
     */
    checkWechatIsSubscribe: (params) => request.get(env.apiPath + '/user/checkWechatIsSubscribe', params)
};

export default userApi;
