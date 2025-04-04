import { NotFoundError } from '../errors/http.error.js';
import ExamRepository from '../repositories/exam.repository.js';
import GradeRepository from '../repositories/grade.repository.js';

class GradeService {
  gradeRepository = new GradeRepository();
  examRepository = new ExamRepository();
  // 성적 생성 및 수정
  upsertGrades = async (classId, grade, examId) => {
    // classId와 examId에 해당되는 시험이 없을 때, 에러 반환
    const exsitedExam = await this.examRepository.getExamById(classId, examId);
    if (!exsitedExam) throw new NotFoundError('해당되는 시험이 없습니다.');

    const data = await this.gradeRepository.upsertGrades(examId, grade);
    return data;
  };

  // 성적 삭제
  deleteGrades = async (classId, examId) => {
    // classId와 examId에 해당되는 시험이 없을 때, 에러 반환
    const exsitedExam = await this.examRepository.getExamById(classId, examId);
    if (!exsitedExam) throw new NotFoundError('해당되는 시험이 없습니다.');

    const data = await this.gradeRepository.deleteGrades(examId);
  };
}

export default GradeService;
