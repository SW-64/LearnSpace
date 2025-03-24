import { prisma } from '../utils/prisma.utils.js';

class EmailRepository {
  // 수업정보 생성
  createClass = async (teacherId, subject, userId) => {
    console.log(teacherId, subject, userId);
    const classInformation = await prisma.class.create({
      data: {
        studentId: userId,
        teacherId,
        subject,
      },
    });
    console.log('zz');
    return classInformation;
  };
}

export default EmailRepository;
