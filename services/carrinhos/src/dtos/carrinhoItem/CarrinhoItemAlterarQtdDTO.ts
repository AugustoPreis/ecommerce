import { plainToClass, Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { number } from 'node-backend-utils/utils';
import { DefaultDTO } from '../DefaultDTO';

export class CarrinhoItemAlterarQtdDTO extends DefaultDTO {

  @IsNumber({}, { message: 'O ID é obrigatório' })
  @Transform(({ value }) => number(value))
  id: number;

  @IsNumber({}, { message: 'A quantidade é obrigatória' })
  @Transform(({ value }) => number(value))
  quantidade: number;

  constructor(values?: object) {
    super();

    if (!values) {
      return;
    }

    Object.keys(this).forEach((key) => this[key] = values[key]);

    this.validate();
  }

  static create(values: object): CarrinhoItemAlterarQtdDTO {
    const classed = plainToClass(CarrinhoItemAlterarQtdDTO, values);

    //Passar pelo constructor para filtrar as propriedades
    return new CarrinhoItemAlterarQtdDTO(classed);
  }
}