import { HTTP_STATUS } from '../constants/http-status.constant.js';
import AttendanceService from '../services/attendance.service.js';

class AttendanceController {
  attendanceService = new AttendanceService();

  // 출석체크
  checkAttendance = async (req, res, next) => {
    try {
      // 수업데이터 가져오기
      const classData = req.classData;
      // 사용자로부터 날짜, 상태 값 받기
      const { todayDate, state } = req.body;

      const data = await this.attendanceService.checkAttendance(
        todayDate,
        state,
        classData.classId,
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
      // 수업데이터 가져오기
      const classData = req.classData;

      const data = await this.attendanceService.getAttendance(
        classData.classId,
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
