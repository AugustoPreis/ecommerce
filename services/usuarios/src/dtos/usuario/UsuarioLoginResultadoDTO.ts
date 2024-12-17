import { DefaultDTO } from '../DefaultDTO';

export class UsuarioLoginResultadoDTO extends DefaultDTO {

  id: number;

  token: string;

  constructor(values?: object) {
    super();

    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}