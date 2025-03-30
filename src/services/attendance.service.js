import { ConflictError, NotFoundError } from '../errors/http.error.js';
import AttendanceRepository from '../repositories/attendance.repository.js';
import ClassRepository from '../repositories/class.repository.js';

class AttendanceService {
  attendanceRepository = new AttendanceRepository();

  // 출석체크
  checkAttendance = async (todayDate, state, classId) => {
    const data = await this.attendanceRepository.checkAttendance(
      classId,
      todayDate,
      state,
    );
  };
  // 출석체크 조회
  getAttendance = async (classId) => {
    const data = await this.attendanceRepository.getAttendance(classId);

    return data;
  };
}

export default AttendanceService;
