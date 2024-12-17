export interface Env {
  port: number;
  db: EnvDB;
}

export interface EnvDB {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}