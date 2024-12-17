import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column()
  cep: string;

  @Column()
  ibgeCidade: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  dataNascimento: Date;

  @Column()
  dataCadastro: Date;

  @Column()
  dataAlteracao: Date;

  @Column()
  ativo: boolean;
}