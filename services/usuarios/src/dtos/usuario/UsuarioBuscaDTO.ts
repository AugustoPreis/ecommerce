import { DefaultDTO } from '../DefaultDTO';

export class UsuarioBuscaDTO extends DefaultDTO {

  nome: string;

  cpf: string;

  rua: string;

  numero: string;

  cep: string;

  ibgeCidade: string;

  telefone: string;

  email: string;

  dataNascimento: Date;

  dataCadastro: Date;

  dataAlteracao: Date;

  constructor(values?: object) {
    super();

    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}