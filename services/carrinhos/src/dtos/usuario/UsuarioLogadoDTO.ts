export class UsuarioLogadoDTO {

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
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}