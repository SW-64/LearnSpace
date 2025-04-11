import { ConflictError, NotFoundError } from '../errors/http.error.js';
import TaskRepository from '../repositories/task.repository.js';
import ClassRepository from './../repositories/class.repository.js';
import 'dotenv/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { MESSAGES } from '../constants/message.constant.js';

// AWS S3 클라이언트 설정
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

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
    if (!existedTask) throw new NotFoundError(MESSAGES.TASK.NOT_FOUND);

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
  submissionsTask = async (studentAnswer, taskImageFile, taskId, classId) => {
    // classId와 taskId가 해당되는 과제가 없을 때, 에러 반환
    const existedTask = await this.getOneTask(taskId, classId);
    if (!existedTask) {
      throw new NotFoundError(MESSAGES.TASK.NOT_FOUND);
    }

    // 과제가 이미 제출되었는지 확인
    const submittedTask = await this.taskRepository.getTaskbyId(taskId);
    if (submittedTask) {
      throw new ConflictError(MESSAGES.TASK.SUBMIT.ALREADY_SUBMITTED);
    }

    //저장될 파일이름 설정
    const timestamp = Date.now();
    const fileKey = `${timestamp}-${taskImageFile.originalname}`;

    // s3에 보낼 파일 설정
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: taskImageFile.buffer,
      ContentType: taskImageFile.mimetype,
    });
    // s3에 파일 업로드
    await s3.send(command);
    // 업로드된 파일의 URL 생성
    const taskImage = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const data = await this.taskRepository.submissionsTask(
      taskId,
      studentAnswer,
      taskImage,
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
