import { ConflictError, NotFoundError } from '../errors/http.error.js';
import AttendanceRepository from '../repositories/attendance.repository.js';
import ClassRepository from '../repositories/class.repository.js';

class AttendanceService {
  attendanceRepository = new AttendanceRepository();
  classRepository = new ClassRepository();

  // 출석체크
  checkAttendance = async (studentId, teacherId, todayDate, state, userId) => {
    // 입력하려는 날짜가 오늘 이후의 날짜일 때, 오류 반환

    // 현재 Jwt에서 가져온 Id에 맞는 teacherId가 맞는지, 아니라면 오류 반환
    const getTeacherId =
      await this.classRepository.getTeacherIdByUserId(userId);
    if (getTeacherId != teacherId) throw new ConflictError('권한이 없습니다.');

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await this.classRepository.getClassData(
      studentId,
      teacherId,
    );
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');

    const data = await this.attendanceRepository.checkAttendance(
      classData.classId,
      todayDate,
      state,
    );
  };
  // 출석체크 조회
  getAttendance = async (studentId, teacherId, userId, userRole) => {
    // 파라미터의 id와 jwt에서 가져온 userId에 맞는 선생님 혹은 학생 id가 같은지
    // 선생님일경우
    if (userRole == 'TEACHER') {
      const getTeacherId =
        await this.classRepository.getTeacherIdByUserId(userId);
      if (getTeacherId != teacherId) throw new ConflictError('권한이 없습니다');

      // 학생일 경우
    } else if (userRole == 'STUDENT') {
      const getStudentId =
        await this.classRepository.getStudentIdByUserId(userId);
      if (getStudentId != studentId) throw new ConflictError('권한이 없습니다');
    }

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await this.classRepository.getClassData(
      studentId,
      teacherId,
    );
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');
    console.log('Zxdf');
    const data = await this.attendanceRepository.getAttendance(
      classData.classId,
    );

    return data;
  };
}

export default AttendanceService;
