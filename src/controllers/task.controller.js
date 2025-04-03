import { HTTP_STATUS } from '../constants/http-status.constant.js';
import TaskService from '../services/task.service.js';

class TaskController {
  taskService = new TaskService();

  // 과제 생성
  makeTask = async (req, res, next) => {
    try {
      // 수업데이터 가져오기
      const classData = req.classData;

      // 사용자로부터 제목, 설명 값 받기
      const { title, description } = req.body;

      const data = await this.taskService.makeTask(
        title,
        description,
        classData.classId,
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
      // 수업데이터 가져오기
      const classData = req.classData;

      const data = await this.taskService.getAllTask(classData.classId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
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
      // 파라미터에서 과제 ID 추출
      const { taskId } = req.params;
      // 수업데이터 가져오기
      const classData = req.classData;

      const data = await this.taskService.getOneTask(
        +taskId,
        classData.classId,
      );
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '과제 상세 조회 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 수정
  updateTask = async (req, res, next) => {
    try {
      // 파라미터에서 과제 ID 추출
      const { taskId } = req.params;
      // 수업데이터 가져오기
      const classData = req.classData;
      // 사용자로부터 제목, 설명 값 받기
      const { title, description } = req.body;

      const data = await this.taskService.updateTask(
        title,
        description,
        +taskId,
        classData.classId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
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
      // 파라미터에서 과제 ID 추출
      const { taskId } = req.params;
      // 수업데이터 가져오기
      const classData = req.classData;
      // 사용자로부터 제목, 설먕 값 받기
      const { studentAnswer } = req.body;

      const data = await this.taskService.submissionsTask(
        studentAnswer,
        +taskId,
        classData.classId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '과제 제출 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 피드백 생성 / 수정
  upsertTaskFeedback = async (req, res, next) => {
    try {
      // 파라미터에서 과제 ID 가져오기
      const { taskId } = req.params;
      // 수업데이터 가져오기
      const classData = req.classData;
      // 피드백 내용 값 가져오기
      const { comment } = req.body;

      const data = await this.taskService.upsertTaskFeedback(
        +taskId,
        comment,
        classData.classId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '과제 피드백 생성/수정 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 과제 피드백 삭제
  deleteTaskFeedback = async (req, res, next) => {
    try {
      // 파라미터에서 과제 ID 가져오기
      const { taskId } = req.params;
      // 수업데이터 가져오기
      const classData = req.classData;

      await this.taskService.deleteTaskFeedback(+taskId, classData.classId);
      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '과제 피드백 삭제 완료 ',
      });
    } catch (err) {
      next(err);
    }
  };
}

// 과제 피드백 삭제

export default TaskController;
