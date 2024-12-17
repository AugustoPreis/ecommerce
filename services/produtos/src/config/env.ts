import { Env } from '../types/Env';

export function getEnv(): Env {
  const {
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
  } = process.env;

  return {
    port: Number(PORT),
    db: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: Number(DB_PORT),
    },
  };
}