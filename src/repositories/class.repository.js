import { prisma } from '../utils/prisma.utils.js';

class ClassRepository {
  // 수업정보 생성
  createClass = async (teacherId, subject, userId) => {
    console.log(teacherId, subject, userId);
    const classInformation = await prisma.class.create({
      studentId: userId,
      teacherId,
      subject,
    });
    return classInformation;
  };
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
