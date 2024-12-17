import { UUID } from 'crypto';
import { isValidNumber } from 'node-backend-utils/validators';
import { BadRequestError, NotFoundError } from 'node-backend-utils/classes';
import { ProdutoBuscaDTO } from '../dtos/produto/ProdutoBuscaDTO';
import { ProdutoListagemFiltroDTO } from '../dtos/produto/ProdutoListagemFiltroDTO';
import { produtoRepository } from '../repositories/produtoRepository';
import { Listagem } from '../types/Listagem';

export class ProdutoService {
  async listar(filtro: ProdutoListagemFiltroDTO): Promise<Listagem<ProdutoBuscaDTO>> {
    const [produtoModels, total] = await produtoRepository.find(filtro);

    const data = ProdutoBuscaDTO.mapper(produtoModels);

    return { data, total };
  }

  async buscarPorId(id: number): Promise<ProdutoBuscaDTO> {
    if (!isValidNumber(id)) {
      throw new BadRequestError('ID do produto não informado');
    }

    const produtoModel = await produtoRepository.findOne({ id });

    if (!produtoModel) {
      throw new NotFoundError('Produto não encontrado');
    }

    return new ProdutoBuscaDTO(produtoModel);
  }

  async buscarFoto(uuid: UUID): Promise<Buffer> {
    return await produtoRepository.findFoto(uuid);
  }
}

export const produtoService = new ProdutoService();