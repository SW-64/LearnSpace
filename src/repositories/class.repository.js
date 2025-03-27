import { prisma } from '../utils/prisma.utils.js';

class ClassRepository {
  // 수업정보 조회
  getClassData = async (studentId, teacherId) => {
    const data = await prisma.class.findFirst({
      where: {
        studentId,
        teacherId,
      },
    });
  };
}

export default ClassRepository;
