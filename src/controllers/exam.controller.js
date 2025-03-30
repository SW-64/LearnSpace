import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ExamService from '../services/exam.service.js';

class ExamController {
  examService = new ExamService();

  //시험일정 생성
  createExam = async (req, res, next) => {
    try {
      const { examDate, examSubject } = req.body;

      const data = await this.examService.createExam({
        examDate,
        examSubject,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.EXAM.CREATE,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ExamController;
