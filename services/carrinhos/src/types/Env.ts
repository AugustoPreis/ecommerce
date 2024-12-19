export interface Env {
  port: number;
  msProdutosPort: number;
  jwtSecret: string;
  db: EnvDB;
}

export interface EnvDB {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}