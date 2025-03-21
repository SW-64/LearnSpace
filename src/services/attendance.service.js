import AttendanceRepository from '../repositories/attendance.repository.js';

class AttendanceService {
  attendanceRepository = new AttendanceRepository();
}

export default AttendanceService;
