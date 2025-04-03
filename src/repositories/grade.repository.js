import { prisma } from '../utils/prisma.utils';

class GradeRepository {
  // 성적 생성 및 수정
  upsertGrades = async (examId, grade) => {
    const data = await prisma.exam.update({
      where: {
        examId,
      },
      data: {
        grade,
      },
    });
    return data;
  };

  // 성적 삭제
  deleteGrades = async (examId) => {
    const data = await prisma.exam.update({
      where: {
        examId,
      },
      data: {
        grade: null,
      },
    });
    return data;
  };
}

export default GradeRepository;
