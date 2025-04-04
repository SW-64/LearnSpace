import { HTTP_STATUS } from '../constants/http-status.constant.js';
import GradeService from '../services/grade.service.js';

class GradeController {
  gradeService = new GradeService();

  // 성적 생성 및 수정
  upsertGrades = async (req, res, next) => {
    try {
      // 수업데이터 가져오기
      const classData = req.classData;
      // 성적 값 가져오기
      const { grade } = req.body;
      // 시험 ID 가져오기
      const { examId } = req.params;

      const data = await this.gradeService.upsertGrades(
        classData.classId,
        grade,
        +examId,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: '성적 생성 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  // 성적 삭제
  deleteGrades = async (req, res, next) => {
    try {
      // 수업데이터 가져오기
      const classData = req.classData;
      // 파라미터에서 시험 ID 가져오기
      const { examId } = req.params;

      const data = await this.gradeService.deleteGrades(
        classData.classId,
        +examId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: '성적 삭제 완료 ',
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default GradeController;
