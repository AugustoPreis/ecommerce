import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categorias' })
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataCadastro: Date;

  @Column()
  dataAlteracao: Date;

  @Column()
  ativo: boolean;
}