import { ConflictError } from '../errors/http.error.js';
import ClassRepository from '../repositories/class.repository.js';
import { prisma } from '../utils/prisma.utils.js';

const classRepository = new ClassRepository(prisma);
export const verifyClassMember = async (req, res, next) => {
  try {
    // 파라미터에서 선생님, 학생 ID 추출
    const { studentId, teacherId } = req.params;

    // 학생 or 선생님인지 추후 검증을 위한 현재 로그인 정보( ID, Role ) 받기
    const userId = req.user.id;
    const userRole = req.user.role;

    // 파라미터의 id와 jwt에서 가져온 userId에 맞는 선생님 혹은 학생 id가 같은지
    // 선생님일경우
    if (userRole == 'TEACHER') {
      const getTeacherId = await classRepository.getTeacherIdByUserId(userId);
      if (getTeacherId != +teacherId)
        throw new ConflictError('권한이 없습니다');

      // 학생일 경우
    } else if (userRole == 'STUDENT') {
      const getStudentId = await classRepository.getStudentIdByUserId(userId);
      if (getStudentId != +studentId)
        throw new ConflictError('권한이 없습니다');
    }

    // teacherId와 studentId에 맞는 수업이 없다면 에러 반환
    const classData = await classRepository.getClassData(
      +studentId,
      +teacherId,
    );
    if (!classData) throw new NotFoundError('Id에 맞는 수업이 없습니다.');

    req.classData = classData;
    next();
  } catch (err) {
    next(err);
  }
};
