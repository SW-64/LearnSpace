import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ExamService from '../services/exam.service.js';

class ExamController {
  examService = new ExamService();

  //시험일정 생성
  createExam = async (req, res, next) => {
    try {
      const classId = req.classData.classId;

      const { date, subject, grade } = req.body;

      const data = await this.examService.createExam({
        classId,
        subject,
        date,
        grade,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.EXAM.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //시험 일정 조회
  getExam = async (req, res, next) => {
    try {
      const classId = req.classData.classId;
      const data = await this.examService.getExam(classId);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.EXAM.GET,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //시험 일정 수정
  patchExam = async (req, res, next) => {
    try {
      const { examId } = req.params;
      const classId = req.classData.classId;

      const { date, subject, grade } = req.body;

      const data = await this.examService.patchExam(
        classId,
        +examId,
        date,
        subject,
        grade,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.EXAM.PATCH,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  //시험 일정 삭제
  deleteExam = async (req, res, next) => {
    try {
      const { examId } = req.params;
      const classId = req.classData.classId;

      const data = await this.examService.deleteExam(classId, +examId);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.EXAM.DELETE,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ExamController;
