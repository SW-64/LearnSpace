import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma.utils.js';
import { authConstant } from '../constants/auth.constant.js';

class AuthRepository {
  create = async ({ email, name, role, subject, password }) => {
    const hashedPassword = bcrypt.hashSync(
      password,
      authConstant.HASH_SALT_ROUNDS,
    );

    const data = await prisma.user.create({
      data: {
        email,
        name,
        role,
        subject,
        password: hashedPassword,
      },
    });

    data.password = undefined;
  };

  findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({ where: email });
    return user;
  };

  findUserById = async (id) => {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    return user;
  };
}

export default AuthRepository;
