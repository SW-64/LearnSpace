import { ConflictError, NotFoundError } from '../errors/http.error.js';
import AttendanceRepository from '../repositories/attendance.repository.js';
import ClassRepository from '../repositories/class.repository.js';

class AttendanceService {
  attendanceRepository = new AttendanceRepository();
  classRepository = new ClassRepository();

  // 출석체크
  checkAttendance = async (studentId, teacherId, todayDate, state, userId) => {
    // 입력하려는 날짜가 오늘 이후의 날짜일 때, 오류 반환

    // 현재 Jwt에서 가져온 Id와 teacherId가 맞는지, 아니라면 오류 반환
    if (teacherId != userId) throw new ConflictError('권한이 없습니다.');

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await this.classRepository(studentId, teacherId);
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');

    const data = await this.attendanceRepository.checkAttendance(
      classData.classId,
      todayDate,
      state,
    );
  };
  // 출석체크 조회
  getAttendance = async (
    studentId,
    teacherId,

    userId,
    userRole,
  ) => {
    // 현재 Jwt에서 가져온 Id와 teacherId가 맞는지, 아니라면 오류 반환

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await this.classRepository(studentId, teacherId);
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');

    const data = await this.attendanceRepository.getAttendance(
      classData.classId,
      todayDate,
      state,
    );
  };
}

export default AttendanceService;
