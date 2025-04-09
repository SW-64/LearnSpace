import { prisma } from '../utils/prisma.utils.js';
import { setCache, getCache } from '../utils/caching.js';

class ScheduleRepository {
  //수업 일정 생성
  createSchedule = async (classId, date, otherMatter, progress) => {
    const data = await prisma.schedule.create({
      data: {
        classId,
        date: new Date(date).toISOString(),
        otherMatter,
        progress,
      },
    });
    return data;
  };

  //수업 일정 전체조회
  getSchedule = async (classId) => {
    const cacheKey = `schedule:${classId}`; //redis 안에 저장될 키값 ex) schedule:8
    const schedule = await getCache(cacheKey);
    if (schedule) {
      return schedule;
    } else {
      const data = await prisma.schedule.findMany({
        where: {
          classId,
        },
      });
      setCache(cacheKey, data);
      return data;
    }
    // const data = await prisma.schedule.findMany({
    //   where: {
    //     classId,
    //   },
    // });
    // return data;
  };

  //수업 일정 ID로 일정 조회
  getScheduleById = async (classId, scheduleId) => {
    const data = await prisma.schedule.findUnique({
      where: {
        classId,
        scheduleId,
      },
    });
    return data;
  };

  //수업 일정 수정
  patchSchedule = async (scheduleId, date, otherMatter, progress) => {
    const patchData = {};

    if (date) {
      patchData.date = new Date(date).toISOString();
    }
    if (otherMatter) {
      patchData.otherMatter = otherMatter;
    }
    if (progress) {
      patchData.progress = progress;
    }

    const data = await prisma.schedule.update({
      where: {
        scheduleId,
      },
      data: patchData,
    });

    return data;
  };

  //수업 일정 취소
  deleteSchedule = async (scheduleId) => {
    const data = await prisma.schedule.delete({
      where: {
        scheduleId,
      },
    });
    return data;
  };
}
export default ScheduleRepository;
