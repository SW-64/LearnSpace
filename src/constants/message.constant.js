import { authConstant } from './auth.constant.js';

export const MESSAGES = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: '이메일을 입력해 주세요.',
        INVALID_FORMAT: '이메일 형식이 올바르지 않습니다.',
        DUPLICATED: '이미 가입 된 사용자입니다.',
      },
      PASSWORD: {
        REQUIRED: '비밀번호를 입력해 주세요.',
        MIN_LENGTH: `비밀번호는 ${authConstant.MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CHECK: {
        REQUIRED: '비밀번호 확인을 입력해 주세요.',
        NOT_MATCHTED_WITH_PASSWORD: '입력한 두 비밀번호가 일치하지 않습니다.',
      },
      NAME: {
        REQUIRED: '이름을 입력해 주세요.',
      },
      ROLE: {
        REQUIRED: '역할을 입력해 주세요.',
      },
      SUBJECT: {
        REQUIRED: '담당 과목을 입력해 주세요.',
      },
      UNAUTHORIZED: '인증 정보가 유효하지 않습니다.',
      JWT: {
        NO_TOKEN: '인증 정보가 없습니다.',
        NOT_SUPPORTED_TYPE: '지원하지 않는 인증 방식입니다.',
        EXPIRED: '인증 정보가 만료되었습니다.',
        NO_USER: '인증 정보와 일치하는 사용자가 없습니다.',
        INVALID: '인증 정보가 유효하지 않습니다.',
        DISCARDED_TOKEN: '폐기 된 인증 정보입니다.',
      },
    },
    SIGN_UP: {
      SUCCEED: '회원가입에 성공했습니다.',
      STUDENT_INVALID: '학생은 과목을 입력할 수 없습니다.',
    },
    SIGN_IN: {
      IS_NOT_EMAIL: '인증정보가 유효하지 않습니다.',
      NOT_USER: '가입되지 않은 이메일입니다.',
      SUCCEED: '로그인에 성공했습니다.',
    },
    SIGN_OUT: {
      IS_NOT_EXIST: '정보가 일치하지 않습니다.',
      SUCCEED: '로그아웃에 성공했습니다.',
    },
    TOKEN: {
      SUCCEED: '토큰 재발급에 성공했습니다.',
    },
    SOCIAL: {
      KAKAKO: {
        SUCCEED: '카카오 로그인에 성공했습니다.',
        NEED_INFO: '카카오 계정에 추가 정보가 필요합니다.',
        MORE_INFO: '카카오 계정에 추가 정보가 입력되었습니다.',
        ALREADY_ADDED_INFO: '이미 추가 정보가 입력되었습니다.',
      },
    },
  },
  EXAM: {
    SUCCEED: '시험 일정 생성에 성공했습니다.',
    GET: '시험 일정 조회에 성공했습니다.',
    PATCH: '시험 일정 수정에 성공했습니다.',
    DELETE: '시험 일정을 삭제했습니다.',
    NOT_EXIST: '해당하는 시험 일정이 존재하지 않습니다.',
  },
  CLASS: {
    SCHEDULE: {
      SUCCEED: '수업 일정 생성에 성공했습니다.',
      GET: '수업 일정 조회에 성공했습니다.',
      PATCH: '수업 일정 수정에 성공했습니다.',
      DELETE: '수업 일정을 취소했습니다.',
      NOT_EXIST: '해당하는 수업 일정이 존재하지 않습니다.',
      NOT_PATCH: '수정된 내용이 없습니다.',
    },
  },
  TASK: {
    SUCCEED: '과제 생성에 성공했습니다.',
    GET: '과제 조회에 성공했습니다.',
    PATCH: '과제 수정에 성공했습니다.',
    DELETE: '과제 삭제에 성공했습니다.',
    SUBMIT: {
      SUCCEED: '과제 제출에 성공했습니다.',
      NOT_EXIST: '해당하는 과제가 존재하지 않습니다.',
      ALREADY_SUBMITTED: '이미 제출한 과제입니다.',
    },
    FEEDBACK: {
      SUCCEED: '피드백 생성/수정에 성공했습니다.',
      NOT_EXIST: '해당하는 피드백이 존재하지 않습니다.',
      DELETE: '피드백 삭제에 성공했습니다.',
    },
    NOT_FOUND: '해당하는 과제가 존재하지 않습니다.',
  },
};
