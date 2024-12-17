import 'dotenv/config';

import { logger, errorToString } from 'node-backend-utils/utils';
import { name, version } from '../package.json';
import { Database } from './config/database';
import { Server } from './config/server';
import { getEnv } from './config/env';
import type { Env } from './types/Env';

export class App {
  public readonly env: Env;

  constructor() {
    this.env = getEnv();
  }

  async init(): Promise<void> {
    try {
      const server = new Server(this.env.port);

      await Database.initialize();
      await server.init();

      logger.info(`(${name}) Servidor iniciado na porta ${this.env.port}, v${version}`);
    } catch (error) {
      logger.error(`(${name}) Erro ao iniciar servidor: ${errorToString(error)}`);

      process.exit(1);
    }
  }
}

export const app = new App();

app.init();