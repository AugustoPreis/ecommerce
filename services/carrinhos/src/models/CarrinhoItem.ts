import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Carrinho } from './Carrinho';

@Entity({ name: 'carrinho_itens' })
export class CarrinhoItem {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carrinho)
  @JoinColumn({ name: 'carrinho_id' })
  carrinho: Carrinho;

  @Column()
  produtoId: number;

  @Column()
  quantidade: number;

  @Column()
  dataCadastro: Date;

  @Column()
  dataAlteracao: Date;

  @Column()
  ativo: boolean;
}