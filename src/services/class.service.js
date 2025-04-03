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
}

export default ClassService;
