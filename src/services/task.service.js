import { ConflictError, NotFoundError } from '../errors/http.error.js';
import TaskRepository from '../repositories/task.repository.js';
import ClassRepository from './../repositories/class.repository.js';

class TaskService {
  taskRepository = new TaskRepository();
  classRepository = new ClassRepository();
  // 과제 생성
  makeTask = async (title, description, classId) => {
    const data = await this.taskRepository.makeTask(
      classId,
      title,
      description,
    );
    return data;
  };

  // 과제 전체 조회
  getAllTask = async (classId) => {
    const data = await this.taskRepository.getAllTask(classId);
    return data;
  };

  // 과제 상세 조회
  getOneTask = async (taskId, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    const existedTask = await this.taskRepository.getOneTask(classId, taskId);
    if (!existedTask)
      throw new NotFoundError('classId와 taskId에 맞는 과제가 없습니다.');

    const data = await this.taskRepository.getOneTask(classId, taskId);
    return data;
  };

  // 과제 수정
  updateTask = async (title, description, taskId, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    this.getOneTask(taskId, classId);

    const data = await this.taskRepository.updateTask(
      taskId,
      title,
      description,
      classId,
    );
    return data;
  };

  // 과제 제출
  submissionsTask = async (studentAnswer, taskId, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    this.getOneTask(taskId, classId);

    const data = await this.taskRepository.submissionsTask(
      taskId,
      studentAnswer,
    );
    return data;
  };

  // 과제 피드백 생성 / 수정
  upsertTaskFeedback = async (taskId, comment, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    this.getOneTask(taskId, classId);

    const data = await this.taskRepository.upsertTaskFeedback(taskId, comment);
    return data;
  };

  // 과제 피드백 삭제
  deleteTaskFeedback = async (taskId, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    this.getOneTask(taskId, classId);

    const data = await this.taskRepository.deleteTaskFeedback(taskId);
    return data;
  };
}

export default TaskService;
