import request from '../lib/request';
import env from '../lib/env';

/**
 * 课程Api
 */
const courseApi = {
  /**
   * 课程列表
   */
  courseList: () => request.get(env.apiPath + '/Course/courseList'),

  /**
   * 课程详情
   */
  courseDetail: id => request.get(env.apiPath + '/Course/detail', { course_id: id }),

  /**
   * 课程目录
   */
  courseLesson: id => request.get(env.apiPath + '/Lesson/courseLesson', { course_id: id }),

  /**
   * 课时信息
   */
  lessonDetail: id => request.get(env.apiPath + '/Lesson/detail', { lesson_id: id }),

  /**
   * 班级列表
   */
  classList: params => request.get(env.apiPath + '/Course/classList', params),
  /**
   * 年级列表
   */
  gradeList: () => request.get(env.apiPath + '/Course/gradeList'),
  /**
   * 报名
   */
  memberJoinClass: body => request.post(env.apiPath + '/Course/memberJoinClass', body),
  /**
   * 报名支付
   */
  orderPay: body => request.post(env.apiPath + '/Course/orderPay', body),

  /**
   * 报名成功
   */
  joinSuccess: body => request.post(env.apiPath + '/Course/joinSuccess', body),

  /**
   * 获取作业信息
   */
  workInfo: id => request.get(env.apiPath + '/Lesson/workInfo', { id }),

  /**
   * 课时视频列表
   * @param params {lesson_id}
   * @returns {*}
   */
  videoList: params => request.get(env.apiPath + '/Lesson/VideoList', params),

  /**
   * 退款
   */
  refund: courseId => request.get(env.apiPath + '/Course/refund', { course_id: courseId })
};

export default courseApi;
