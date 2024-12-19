import { UUID } from 'crypto';
import { CategoriaBuscaDTO } from '../categoria/CategoriaBuscaDTO';
import { MarcaBuscaDTO } from '../marca/MarcaBuscaDTO';

export class ProdutoBuscaDTO {

  id: number;

  uuid: UUID;

  nome: string;

  descricao: string;

  valor: number;

  marca: MarcaBuscaDTO;

  categoria: CategoriaBuscaDTO;

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);

    if (this.marca) {
      this.marca = new MarcaBuscaDTO(this.marca);
    }

    if (this.categoria) {
      this.categoria = new CategoriaBuscaDTO(this.categoria);
    }
  }
}