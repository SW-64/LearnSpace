import { prisma } from '../utils/prisma.utils.js';

class TaskRepository {
  // 과제 생성
  makeTask = async (classId, title, description) => {
    const data = await prisma.task.create({
      data: {
        classId,
        title,
        description,
      },
    });
    return data;
  };

  // 과제 전체 조회
  getAllTask = async (classId) => {
    const data = await prisma.task.findMany({
      where: {
        classId,
      },
    });
    return data;
  };

  // 과제 상세 조회
  getOneTask = async (classId, taskId) => {
    const data = await prisma.task.findFirst({
      where: {
        classId,
        taskId,
      },
    });
    return data;
  };

  // 과제 수정
  updateTask = async (taskId, title, description) => {
    // 업데이트할 데이터를 담을 객체 생성
    const updateData = {};

    // title과 description이 존재할 경우에만 객체에 추가
    if (title) {
      updateData.title = title;
    }
    if (description) {
      updateData.description = description;
    }
    const data = await prisma.task.update({
      where: {
        taskId,
      },
      data: updateData,
    });
    return data;
  };

  // 과제 제출
  submissionsTask = async (taskId, studentAnswer, taskImage) => {
    const data = await prisma.task.update({
      where: {
        taskId,
      },
      data: {
        studentAnswer: studentAnswer,
        taskImage,
        submit: 'SUCCESS',
      },
    });
    return data;
  };

  // 과제 피드백 생성 / 수정
  upsertTaskFeedback = async (taskId, comment) => {
    const data = await prisma.task.update({
      where: {
        taskId,
      },
      data: {
        comment,
      },
    });
    return data;
  };

  // 과제 피드백 삭제
  deleteTaskFeedback = async (taskId) => {
    const data = await prisma.task.update({
      where: {
        taskId,
      },
      data: {
        comment: null,
      },
    });
    return data;
  };

  // 과제 ID로 조회
  getTaskbyId = async (taskId) => {
    const data = await prisma.task.findUnique({
      where: {
        taskId,
        submit: 'SUCCESS',
      },
    });
    return data;
  };
}

export default TaskRepository;
