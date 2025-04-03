import { MESSAGES } from '../constants/message.constant.js';
import { NotFoundError } from '../errors/http.error.js';
import ClassRepository from '../repositories/class.repository.js';
import ScheduleRepository from '../repositories/schedule.repository.js';

class ClassService {
  classRepository = new ClassRepository();
  scheduleRepository = new ScheduleRepository();

  createSchedule = async (classId, date, otherMatter, progress) => {
    const existedClass = await this.classRepository.getClassById(classId);
    if (!existedClass) {
      throw new NotFoundError(MESSAGES.CLASS.SCHEDULE.NOT_EXIST);
    }
    const data = await this.scheduleRepository.createSchedule(
      classId,
      date,
      otherMatter,
      progress,
    );
    return data;
  };

  getSchedule = async (classId) => {
    const existedClass = await this.classRepository.getClassById(classId);
    if (!existedClass) {
      throw new NotFoundError(MESSAGES.CLASS.SCHEDULE.NOT_EXIST);
    }

    const data = await this.scheduleRepository.getSchedule(classId);
    return data;
  };

  patchSchedule = async (classId, scheduleId, date, otherMatter, progress) => {
    const existedSchedule = await this.scheduleRepository.getScheduleById(
      classId,
      scheduleId,
    );
    if (!existedSchedule) {
      throw new NotFoundError(MESSAGES.CLASS.SCHEDULE.NOT_EXIST);
    }

    // 날짜 비교를 위해 ISO 문자열로 변환
    const originDate = new Date(existedSchedule.date).toISOString();
    const newDate = new Date(date).toISOString();

    // 수정된 내용이 없는 경우 에러발생
    if (
      originDate == newDate &&
      otherMatter == existedSchedule.otherMatter &&
      progress == existedSchedule.progress
    ) {
      throw new NotFoundError(MESSAGES.CLASS.SCHEDULE.NOT_PATCH);
    }

    const newData = await this.scheduleRepository.patchSchedule(
      scheduleId,
      date,
      otherMatter,
      progress,
    );

    return newData;
  };

  deleteSchedule = async (classId, scheduleId) => {
    const existedSchedule = await this.scheduleRepository.getScheduleById(
      classId,
      scheduleId,
    );
    if (!existedSchedule) {
      throw new NotFoundError(MESSAGES.CLASS.SCHEDULE.NOT_EXIST);
    }

    const data = await this.scheduleRepository.deleteSchedule(scheduleId);
    return data;
  };
}

export default ClassService;
