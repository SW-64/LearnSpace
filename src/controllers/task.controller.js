import { HTTP_STATUS } from '../constants/http-status.constant.js';
import TaskService from '../services/task.service.js';

class TaskController {
  taskService = new TaskService();

  // 과제 생성
  makeTask = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId } = req.params;

      // 사용자로부터 제목, 설먕 값 받기
      const { title, description } = req.body;

      // 선생님인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;

      const data = await this.taskService.makeTask(
        +studentId,
        +teacherId,
        title,
        description,
        userId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '과제 생성 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 전체 조회
  getAllTask = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId } = req.params;

      // 해당 수업의 선생님 or 학생인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;
      const userRole = req.user.role;

      const data = await this.taskService.getAllTask(
        +studentId,
        +teacherId,
        userRole,
        userId,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '과제 전체 조회 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 상세 조회
  getOneTask = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId, taskId } = req.params;

      // 해당 수업의 선생님 or 학생인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;
      const userRole = req.user.role;

      const data = await this.taskService.getOneTask(
        +studentId,
        +teacherId,
        +taskId,
        userId,
        userRole,
      );
      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '과제 상세 조회 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 수정
  patchTask = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId, taskId } = req.params;

      // 사용자로부터 제목, 설먕 값 받기
      const { title, description } = req.body;

      // 선생님인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;

      const data = await this.taskService.patchTask(
        +studentId,
        +teacherId,
        title,
        description,
        userId,
        +taskId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '과제 수정 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 제출
  submissionsTask = async (req, res, next) => {
    try {
      // 파라미터에서 선생님, 학생 ID 추출
      const { studentId, teacherId, taskId } = req.params;

      // 사용자로부터 제목, 설먕 값 받기
      const { studentAnswer } = req.body;

      // 학생인지 추후 검증을 위한 현재 로그인 정보 받기
      const userId = req.user.id;

      const data = await this.taskService.submissionsTask(
        +studentId,
        +teacherId,
        studentAnswer,
        userId,
        +taskId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '과제 제출 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default TaskController;
