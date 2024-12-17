import express, { Express } from 'express';
import { routes } from '../routes/routes';
import { errorHandler } from '../middlewares/errorHandler';

export class Server {
  private readonly app: Express;
  private readonly port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.configure();
  }

  configure(): void {
    this.app.use(express.json());

    this.app.use(routes);

    this.app.use(errorHandler);
  }

  async init(): Promise<number> {
    return new Promise((resolve, reject) => {
      const server = this.app.listen(this.port, () => {
        resolve(this.port);
      });

      server.on('error', reject);
    });
  }
}