import { IsDateString, IsEmail, IsOptional, Length, MaxLength } from 'class-validator';
import { DefaultDTO } from '../DefaultDTO';

export class UsuarioCadastroDTO extends DefaultDTO {

  @Length(1, 50, { message: 'O nome é obrigatório e deve conter no máximo $constraint2 caracteres' })
  nome: string;

  @Length(11, 11, { message: 'O CPF é obrigatório e deve conter $constraint1 caracteres' })
  cpf: string;

  @Length(1, 100, { message: 'A rua é obrigatória e conter no máximo $constraint2 caracteres' })
  rua: string;

  @MaxLength(10, { message: 'O número deve conter no máximo $constraint2 caracteres' })
  @IsOptional()
  numero: string;

  @Length(8, 8, { message: 'O CEP é obrigatório e deve conter $constraint1 caracteres' })
  cep: string;

  @Length(8, 20, { message: 'O telefone é obrigatório e deve conter entre $constraint1 e $constraint2 caracteres' })
  telefone: string;

  @Length(1, 100, { message: 'O email deve conter no máximo $constraint2 caracteres' })
  @IsEmail({}, { message: 'O email é obrigatório' })
  email: string;

  @Length(6, 20, { message: 'A senha é obrigatória e deve conter entre $constraint1 e $constraint2 caracteres' })
  senha: string;

  @IsDateString({}, { message: 'A data de nascimento é obrigatória' })
  dataNascimento: string;

  constructor(values?: object) {
    super();

    Object.keys(this).forEach((key) => this[key] = values[key]);

    this.validate();
  }
}