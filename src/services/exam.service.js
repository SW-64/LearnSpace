import ExamRepository from '../repositories/exam.repository.js';

class ExamService {
  examRepository = new ExamRepository();

  createExam = async ({ examDate, examSubject }) => {};
}

export default ExamService;
