import passport from 'passport';
import { Strategy as kakaostStrategy } from 'passport-kakao';
import 'dotenv/config';
import { prisma } from '../utils/prisma.utils.js';
import AuthService from '../services/auth.service.js';

const authService = new AuthService();

passport.use(
  new kakaostStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existedUser = await prisma.user.findUnique({
          where: { email: profile._json.kakao_account.email },
        });
        if (existedUser) {
          return done(null, existedUser);
        } else {
          const user = await prisma.user.create({
            data: {
              email: profile._json.kakao_account.email,
              name: profile._json.properties.nickname,
              role: 'STUDENT',
            },
          });
          const token = await authService.generateAuthTokens({
            id: user.id,
          });
          const data = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
          done(null, { user, data });
        }
      } catch (error) {
        console.error('Kakao login error:', error);
        done(error, null);
      }
    },
  ),
);
