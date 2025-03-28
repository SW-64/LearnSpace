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
    return data;
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

  // 유저 ID로 선생님 ID 조회
  getTeacherIdByUserId = async (userId) => {
    const teacher = await prisma.teacher.findUnique({
      where: {
        userId: +userId,
      },
    });
    return teacher.teacherId;
  };

  // 유저 ID로 학생 ID 조회
  getStudentIdByUserId = async (userId) => {
    const student = await prisma.student.findUnique({
      where: {
        userId,
      },
    });
    return student.studentId;
  };
}

export default ClassRepository;
