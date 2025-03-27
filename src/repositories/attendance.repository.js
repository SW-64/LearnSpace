import { prisma } from '../utils/prisma.utils.js';

class AttendanceRepository {
  // 출석체크
  checkAttendance = async (classId, todayDate, state) => {
    const data = await prisma.attendance.create({
      classId,
      todayDate,
      state,
    });
  };

  // 출석체크 조회
  getAttendance = async (classId, todayDate, state) => {
    const data = await prisma.attendance.findMany({
      classId,
    });
  };
}

export default AttendanceRepository;
