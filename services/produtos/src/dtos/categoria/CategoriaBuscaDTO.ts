export class CategoriaBuscaDTO {

  id: number;

  nome: string;

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }
}