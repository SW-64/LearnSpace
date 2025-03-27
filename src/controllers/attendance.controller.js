import AttendanceService from '../services/attendance.service.js';

class AttendanceController {
  attendanceService = new AttendanceService();

  // 출석체크
  checkAttendance = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId } = req.params;

      // 선생님인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;

      const data = await this.attendanceService.checkAttendance(
        studentId,
        teacherId,
        userId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '출석체크 완료',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 출석체크 조회
  getAttendance = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId } = req.params;

      // 날짜, 상태( 출석 / 지각 / 연기 ) 값 받기
      const { todayDate, state } = req.body;

      // 학생이라면 학생권한인지, 선생님이라면 선생님 권한인지 추후 확인하기 위해 정보 추출
      const userRole = req.user.role;
      const userId = req.user.id;

      const data = await this.attendanceService.getAttendance(
        studentId,
        teacherId,
        todayDate,
        state,
        userId,
        userRole,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '출석체크 조회 완료',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default AttendanceController;
