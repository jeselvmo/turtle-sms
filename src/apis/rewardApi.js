import request from "../lib/request";
import env from "../lib/env";

/**
 * 后台接口
 */
const rewardApi = {

    /**
     * 获取打赏金额列表
     * @param params
     * @returns {*}
     */
    rewardAmount: () => request.get(env.apiPath + '/reward/rewardAmount'),

    /**
     * 赞赏用户列表
     * @param params {type, id, page}
     * @returns {*}
     */
    rewardMemberList: (params) => request.post(env.apiPath + '/reward/rewardMemberList', params),

    /**
     * 打赏
     * @param body {type, id, pay_mode, amount}
     * @returns {*}
     */
    reward: (body) => request.post(env.apiPath + '/reward/reward', body),
};

export default rewardApi;
