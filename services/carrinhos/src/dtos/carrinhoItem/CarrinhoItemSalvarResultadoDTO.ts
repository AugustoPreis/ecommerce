export class CarrinhoItemSalvarResultadoDTO {

  id: number;

  dataCadastro: Date;

  dataAlteracao: Date;

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}