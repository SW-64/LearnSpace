import { prisma } from '../utils/prisma.utils.js';

class ScheduleRepository {
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
}
export default ScheduleRepository;
