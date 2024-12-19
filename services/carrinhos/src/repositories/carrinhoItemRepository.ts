import { QueryRunner } from 'typeorm';
import { Database } from '../config/database';
import { CarrinhoItem } from '../models/CarrinhoItem';

export class CarrinhoItemRepository {
  private readonly repository = Database.getRepository(CarrinhoItem);

  async find(carrinhoItemModel: Partial<CarrinhoItem>): Promise<CarrinhoItem[]> {
    return await this.repository.find({
      where: {
        ...carrinhoItemModel,
        ativo: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(carrinhoItemModel: Partial<CarrinhoItem>): Promise<CarrinhoItem> {
    return await this.repository.findOne({
      relations: ['carrinho'],
      where: {
        ...carrinhoItemModel,
        ativo: true,
      },
    });
  }

  async salvar(carrinhoItemModel: CarrinhoItem, qr?: QueryRunner): Promise<CarrinhoItem> {
    if (qr) {
      return await qr.manager.save(carrinhoItemModel);
    }

    return await this.repository.save(carrinhoItemModel);
  }
}

export const carrinhoItemRepository = new CarrinhoItemRepository();