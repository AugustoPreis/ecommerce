import { DefaultDTO } from '../DefaultDTO';

//Apenas os dados básicos do usuário, para detalhes utilizar o usuarioRepository
export class UsuarioLogadoDTO extends DefaultDTO {

  id: number;

  nome: string;

  ativo: boolean;

  static toJSON(usuarioLogadoDTO: UsuarioLogadoDTO) {
    return {
      id: usuarioLogadoDTO.id,
      nome: usuarioLogadoDTO.nome,
      ativo: usuarioLogadoDTO.ativo,
    };
  }

  constructor(values?: object) {
    super();

    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}