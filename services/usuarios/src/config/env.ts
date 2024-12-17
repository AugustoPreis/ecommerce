import { Env } from '../types/Env';

export function getEnv(): Env {
  const {
    PORT,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
  } = process.env;

  return {
    port: Number(PORT),
    jwtSecret: JWT_SECRET,
    jwtExpiresIn: JWT_EXPIRES_IN,
    db: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: Number(DB_PORT),
    },
  };
}