import { prisma } from '../utils/prisma.utils.js';

class ClassRepository {
  // 수업정보 생성
  createClass = async (teacherId, subject, studentId) => {
    const classInformation = await prisma.class.create({
      data: {
        studentId,
        teacherId,
        subject,
      },
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

  // 선생님 담당 과목 조회
  getTeacherSubject = async (teacherId) => {
    const data = await prisma.teacher.findUnique({
      where: {
        teacherId,
      },
      select: {
        subject: true,
      },
    });
    return data.subject;
  };
}

export default ClassRepository;
