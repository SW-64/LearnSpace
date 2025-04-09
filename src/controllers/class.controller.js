import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ClassService from '../services/class.service.js';

class ClassController {
  classService = new ClassService();

  //수업 일정 생성
  createClassSchedule = async (req, res, next) => {
    try {
      const classId = req.classData.classId;
      const { date, otherMatter, progress } = req.body;

      const data = await this.classService.createSchedule(
        classId,
        date,
        otherMatter,
        progress,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CLASS.SCHEDULE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //수업 일정 전체조회
  getClassSchedule = async (req, res, next) => {
    try {
      const classId = req.classData.classId;

      const getSchedule = await this.classService.getSchedule(classId);
      console.log(typeof getSchedule, getSchedule);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CLASS.SCHEDULE.GET,
        getSchedule,
      });
    } catch (error) {
      next(error);
    }
  };

  //수업 일정 수정
  updateClassSchedule = async (req, res, next) => {
    try {
      const classId = req.classData.classId;
      const { scheduleId } = req.params;
      const { date, otherMatter, progress } = req.body;

      const data = await this.classService.patchSchedule(
        classId,
        +scheduleId,
        date,
        otherMatter,
        progress,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CLASS.SCHEDULE.PATCH,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //수업 일정 취소

  deleteClassSchedule = async (req, res, next) => {
    try {
      const { scheduleId } = req.params;
      const classId = req.classData.classId;

      const data = await this.classService.deleteSchedule(classId, +scheduleId);
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.CLASS.SCHEDULE.DELETE,
        data: { scheduleId: data.scheduleId },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ClassController;
