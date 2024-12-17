import { plainToClass, Transform } from 'class-transformer';
import { string, number } from 'node-backend-utils/utils';

export class ProdutoListagemFiltroDTO {

  @Transform(({ value }) => number(value))
  pagina: number;

  @Transform(({ value }) => number(value))
  itensPagina: number;

  @Transform(({ value }) => string(value, { trim: true }))
  nome: string;

  @Transform(({ value }) => number(value))
  marcaId: number;

  @Transform(({ value }) => number(value))
  categoriaId: number;

  @Transform(({ value }) => number(value))
  valorMin: number;

  @Transform(({ value }) => number(value))
  valorMax: number;

  @Transform(({ value }) => string(value))
  ordem: string;

  @Transform(({ value }) => string(value))
  ordenarPor: string;

  constructor(values?: object) {
    if (!values) {
      return;
    }

    Object.keys(this).forEach((key) => this[key] = values[key]);
  }

  static create(values: object): ProdutoListagemFiltroDTO {
    const classed = plainToClass(ProdutoListagemFiltroDTO, values);

    //Passar pelo constructor para filtrar as propriedades
    return new ProdutoListagemFiltroDTO(classed);
  }
}