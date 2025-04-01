import { prisma } from '../utils/prisma.utils.js';

class ExamRepository {
  createExam = async (classId, date, subject, grade) => {
    const data = await prisma.exam.create({
      data: {
        classId,
        date,
        subject,
        grade,
      },
    });
    return data;
  };

  getExam = async (classId) => {
    const data = await prisma.exam.findMany({
      where: {
        classId,
      },
    });
    return data;
  };

  getExamById = async (classId, examId) => {
    const data = await prisma.exam.findFirst({
      where: {
        classId,
        examId,
      },
    });
    return data;
  };

  patchExam = async (examId, date, subject, grade) => {
    const patchData = {};
    if (date) {
      patchData.date = date;
    }
    if (subject) {
      patchData.subject = subject;
    }
    if (grade) {
      patchData.grade = grade;
    }

    const data = await prisma.exam.update({
      where: {
        examId,
      },
      data: patchData,
    });

    return data;
  };

  deleteExam = async (examId) => {
    const data = await prisma.exam.delete({
      where: {
        examId,
      },
    });
    return data;
  };
}

export default ExamRepository;
