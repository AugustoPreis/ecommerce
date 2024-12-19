export class CarrinhoCadastroResultadoDTO {

  id: number;

  dataCadastro: number;

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}