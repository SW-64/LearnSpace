import { MESSAGES } from '../constants/message.constant.js';
import { NotFoundError } from '../errors/http.error.js';
import ExamRepository from '../repositories/exam.repository.js';

class ExamService {
  examRepository = new ExamRepository();

  createExam = async ({ classId, subject, date, grade }) => {
    const data = await this.examRepository.createExam(
      classId,
      date,
      subject,
      grade,
    );
    return data;
  };

  getExam = async (classId) => {
    const data = await this.examRepository.getExam(classId);

    return data;
  };

  patchExam = async (classId, examId, date, subject, grade) => {
    const existedExam = await this.examRepository.getExamById(classId, examId);
    if (!existedExam) {
      throw new NotFoundError(MESSAGES.EXAM.NOT_EXIST);
    }

    const data = await this.examRepository.patchExam(
      examId,
      date,
      subject,
      grade,
    );

    return data;
  };

  deleteExam = async (classId, examId) => {
    const existedExam = await this.examRepository.getExamById(classId, examId);
    if (!existedExam) {
      throw new NotFoundError(MESSAGES.EXAM.NOT_EXIST);
    }

    const data = await this.examRepository.deleteExam(examId);

    return data;
  };
}

export default ExamService;
