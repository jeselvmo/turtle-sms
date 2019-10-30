import request from "../lib/request";
import env from "../lib/env";

/**
 * 客服接口
 */
const customerApi = {

    /**
     * 用户离开客服聊天页面
     * @returns {*}
     */
    userLeaveChatPage: () => request.post(env.apiPath + '/Customer/userLeaveChatPage'),

};

export default customerApi;
