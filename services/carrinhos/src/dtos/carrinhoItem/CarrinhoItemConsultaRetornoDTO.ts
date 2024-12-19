import { CarrinhoItem } from '../../models/CarrinhoItem';
import { ProdutoBuscaDTO } from '../produto/ProdutoBuscaDTO';

export class CarrinhoItemConsultaRetornoDTO {

  id: number;

  produtoId: number;

  produto: ProdutoBuscaDTO;

  quantidade: number;

  dataCadastro: Date;

  constructor(values?: object) {
    Object.keys(this).forEach((key) => this[key] = values[key]);
  }

  static mapper(carrinhoItemModels: CarrinhoItem[], produtos: ProdutoBuscaDTO[]): CarrinhoItemConsultaRetornoDTO[] {
    return carrinhoItemModels.map((carrinhoItemModel) => {
      const carrinhoItem = new CarrinhoItemConsultaRetornoDTO(carrinhoItemModel);

      carrinhoItem.produto = produtos.find((produto) => produto.id = carrinhoItemModel.produtoId);

      return carrinhoItem;
    });
  }
}