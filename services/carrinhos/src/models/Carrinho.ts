import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'carrinhos' })
export class Carrinho {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuarioId: number;

  @Column()
  dataCadastro: Date;

  @Column()
  dataAlteracao: Date;

  @Column()
  ativo: boolean;
}