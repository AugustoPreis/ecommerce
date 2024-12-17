import path from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { getEnv } from './env';

//Não importar do app.env (erro de circular import)
const { db: dbConfig } = getEnv();

export const Database = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  entities: [path.join(__dirname, '../models/**.{js,ts}')],

  //com_underline > comUnderline (e vice versa)
  namingStrategy: new SnakeNamingStrategy(),
});