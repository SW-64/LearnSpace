import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.utils.js';
import { authConstant } from '../constants/auth.constant.js';

class AuthRepository {
  create = async ({ email, name, role, subject, password }) => {
    //비밀번호 암호화처리
    const hashedPassword = bcrypt.hashSync(
      password,
      authConstant.HASH_SALT_ROUNDS,
    );

    const data = await prisma.user.create({
      data: {
        email,
        name,
        role,
        password: hashedPassword,
        ...(role === 'TEACHER' && { subject }), // 선생님인 경우 과목 작성
        ...(role === 'TEACHER' && {
          // 선생님일 경우 teacher 테이블 생성
          teacher: {
            create: {
              subject,
            },
          },
        }),
        ...(role === 'STUDENT' && {
          // 학생일 경우 student 테이블 생성
          student: {
            create: {},
          },
        }),
      },
      include: { teacher: true, student: true },
    });

    data.password = undefined;
  };

  findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  };

  findUserById = async (id) => {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    return user;
  };

  upsertRefreshToken = async (userId, refreshToken) => {
    const hashedRefreshToken = bcrypt.hashSync(
      refreshToken,
      authConstant.HASH_SALT_ROUNDS,
    );
    const getRefreshToken = await prisma.refreshToken.upsert({
      where: { userId },
      // refreshToken을 가지고 있는 경우 : 업데이트
      update: { refreshToken: hashedRefreshToken },
      // refreshToken이 없는 경우 : 생성
      create: {
        userId,
        refreshToken: hashedRefreshToken,
      },
    });

    return getRefreshToken;
  };

  findRefreshToken = async (id) => {
    const existedRefreshToken = await prisma.refreshToken.findUnique({
      where: { userId: id },
    });

    return existedRefreshToken;
  };

  signOut = async (user) => {};
}

export default AuthRepository;
