import { Env } from '../types/Env';

export function getEnv(): Env {
  const {
    PORT,
    MS_PRODUTOS_PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    DB_PORT,
    JWT_SECRET,
  } = process.env;

  return {
    port: Number(PORT),
    msProdutosPort: Number(MS_PRODUTOS_PORT),
    jwtSecret: JWT_SECRET,
    db: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: Number(DB_PORT),
    },
  };
}