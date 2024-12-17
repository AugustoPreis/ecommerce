import { UUID } from 'crypto';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Marca } from './Marca';
import { Categoria } from './Categoria';

@Entity({ name: 'produtos' })
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: UUID;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Marca)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ type: 'bytea', select: false })
  foto: Buffer;

  @Column({ type: 'numeric' })
  valor: number;

  @Column()
  dataCadastro: Date;

  @Column()
  dataAlteracao: Date;

  @Column()
  ativo: boolean;
}