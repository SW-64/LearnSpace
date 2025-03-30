import { ConflictError, NotFoundError } from '../errors/http.error.js';
import TaskRepository from '../repositories/task.repository.js';
import ClassRepository from './../repositories/class.repository.js';

class TaskService {
  taskRepository = new TaskRepository();
  classRepository = new ClassRepository();
  // 과제 생성
  makeTask = async (studentId, teacherId, title, description, userId) => {
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

    const data = await this.taskRepository.makeTask(
      classData.classId,
      title,
      description,
    );
    return data;
  };

  // 과제 전체 조회
  getAllTask = async (studentId, teacherId, userRole, userId) => {
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

    const data = await this.taskRepository.getAllTask(classData.classId);
    return data;
  };

  // 과제 상세 조회
  getOneTask = async (studentId, teacherId, taskId, userId, userRole) => {
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

    const data = await this.taskRepository.getOneTask(
      classData.classId,
      taskId,
    );
    return data;
  };

  // 과제 수정
  patchTask = async (
    studentId,
    teacherId,
    title,
    description,
    userId,
    taskId,
  ) => {
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

    const data = await this.taskRepository.patchTask(
      taskId,
      title,
      description,
    );
    return data;
  };

  // 과제 제출
  submissionsTask = async (
    studentId,
    teacherId,
    studentAnswer,
    userId,
    taskId,
  ) => {
    // 현재 Jwt에서 가져온 Id에 맞는 studentId 맞는지, 아니라면 오류 반환
    const getStudentId =
      await this.classRepository.getStudentIdByUserId(userId);
    if (getStudentId != studentId) throw new ConflictError('권한이 없습니다.');

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await this.classRepository.getClassData(
      studentId,
      teacherId,
    );
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');

    // taskId에 맞는 과제가 없다면 에러 반환
    const task = await this.taskRepository.getOneTask(
      classData.classId,
      taskId,
    );
    if (!task) throw new NotFoundError('Id에 맞는 과제가 없습니다.');

    const data = await this.taskRepository.submissionsTask(
      taskId,
      studentAnswer,
    );
    return data;
  };
}

export default TaskService;
