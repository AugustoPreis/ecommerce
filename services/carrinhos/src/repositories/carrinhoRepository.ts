import { QueryRunner } from 'typeorm';
import { Carrinho } from '../models/Carrinho';
import { Database } from '../config/database';

export class CarrinhoRepository {
  private readonly repository = Database.getRepository(Carrinho);

  async findOne(carrinhoModel: Partial<Carrinho>): Promise<Carrinho> {
    return await this.repository.findOneBy({
      ...carrinhoModel,
      ativo: true,
    });
  }

  async salvar(carrinhoModel: Carrinho, qr?: QueryRunner): Promise<Carrinho> {
    if (qr) {
      return await qr.manager.save(carrinhoModel);
    }

    return await this.repository.save(carrinhoModel);
  }
}

export const carrinhoRepository = new CarrinhoRepository();