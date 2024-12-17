import { Length } from 'class-validator';
import { DefaultDTO } from '../DefaultDTO';

export class UsuarioLoginDTO extends DefaultDTO {

  @Length(1, 100, { message: 'O login é obrigatório e deve conter no máximo $constraint2 caracteres' })
  login: string;

  @Length(6, 20, { message: 'A senha é obrigatória e deve conter entre $constraint1 e $constraint2 caracteres' })
  senha: string;

  constructor(values?: object) {
    super();

    Object.keys(this).forEach((key) => this[key] = values[key]);

    this.validate();
  }
}