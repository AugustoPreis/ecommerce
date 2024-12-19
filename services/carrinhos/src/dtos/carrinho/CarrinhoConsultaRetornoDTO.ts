import { CarrinhoItemConsultaRetornoDTO } from '../carrinhoItem/CarrinhoItemConsultaRetornoDTO';

export class CarrinhoConsultaRetornoDTO {

  id: number;

  dataCadastro: Date;

  itens: CarrinhoItemConsultaRetornoDTO[];

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}