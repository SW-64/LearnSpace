import { prisma } from '../utils/prisma.utils.js';

class AttendanceRepository {
  // 출석체크
  checkAttendance = async (classId, todayDate, state) => {
    const data = await prisma.attendance.create({
      data: {
        classId,
        todayDate,
        state,
      },
    });
  };

  // 출석체크 조회
  getAttendance = async (classId) => {
    const data = await prisma.attendance.findMany({
      where: {
        classId,
      },
    });
    return data;
  };
}

export default AttendanceRepository;
