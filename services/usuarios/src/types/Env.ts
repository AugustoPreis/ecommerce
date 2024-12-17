export interface Env {
  port: number;
  db: EnvDB;
  jwtSecret: string;
  jwtExpiresIn: string;
}

export interface EnvDB {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}