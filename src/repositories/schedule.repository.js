import { prisma } from '../utils/prisma.utils.js';

class ScheduleRepository {
  //수업 일정 생성
  createSchedule = async (classId, date, otherMatter, progress) => {
    const data = await prisma.schedule.create({
      data: {
        classId,
        date,
        otherMatter,
        progress,
      },
    });
    return data;
  };

  //수업 일정 전체조회
  getSchedule = async (classId) => {
    const data = await prisma.schedule.findMany({
      where: {
        classId,
      },
    });
    return data;
  };
}
export default ScheduleRepository;
