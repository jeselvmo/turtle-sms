import request from "../lib/request";
import env from '../lib/env';

/**
 * 课程Api
 */
const lessonApi = {

    /**
     * 课时问答列表
     * @param params {lesson_id}
     * @returns {*}
     */
    questionList: (params) => request.get(env.apiPath + '/Lesson/questionList', params),

    /**
     * 作业列表
     * @param params {page}
     * @returns {*}
     */
    workList: (params) => request.get(env.apiPath + '/Lesson/workList', params),

};

export default lessonApi;
