import axios from 'axios';
import { BadRequestError, ForbiddenError, NotFoundError, RequestError } from 'node-backend-utils/classes';
import { isValidNumber } from 'node-backend-utils/validators';
import { CarrinhoItemConsultaRetornoDTO } from '../dtos/carrinhoItem/CarrinhoItemConsultaRetornoDTO';
import { ProdutoBuscaDTO } from '../dtos/produto/ProdutoBuscaDTO';
import { CarrinhoItemSalvarDTO } from '../dtos/carrinhoItem/CarrinhoItemSalvarDTO';
import { CarrinhoItemSalvarResultadoDTO } from '../dtos/carrinhoItem/CarrinhoItemSalvarResultadoDTO';
import { CarrinhoItemAlterarQtdDTO } from '../dtos/carrinhoItem/CarrinhoItemAlterarQtdDTO';
import { UsuarioLogadoDTO } from '../dtos/usuario/UsuarioLogadoDTO';
import { Listagem } from '../types/Listagem';
import { Carrinho } from '../models/Carrinho';
import { CarrinhoItem } from '../models/CarrinhoItem';
import { carrinhoRepository } from '../repositories/carrinhoRepository';
import { carrinhoItemRepository } from '../repositories/carrinhoItemRepository';
import { app } from '../app';

export class CarrinhoItemService {

  async listar(carrinhoModel: Carrinho): Promise<CarrinhoItemConsultaRetornoDTO[]> {
    const carrinhoItemModels = await carrinhoItemRepository.find({ carrinho: carrinhoModel });

    const produtos = await this.listarProdutos(carrinhoItemModels);

    return CarrinhoItemConsultaRetornoDTO.mapper(carrinhoItemModels, produtos);
  }

  async buscarProduto(produtoId: number): Promise<ProdutoBuscaDTO> {
    try {
      const response = await axios.get(`http://localhost:${app.env.msProdutosPort}/produtos/${produtoId}`);

      return response.data as ProdutoBuscaDTO;
    } catch (err) {
      const { status, data } = err.response;

      throw new RequestError(status, data?.message);
    }
  }

  /*
    Busca do serviço de produtos
    Uma única requisição retorna todos os produtos de um carrinho, para evitar problemas de performance
  */
  async listarProdutos(carrinhoItemModels: CarrinhoItem[]): Promise<ProdutoBuscaDTO[]> {
    //Busca o ID de todos os produtos, sem repetir

    const idProdutos = Array.from(new Set(carrinhoItemModels.map((carrinhoItemModel) => carrinhoItemModel.produtoId)));

    if (!idProdutos.length) {
      return [];
    }

    try {
      const response = await axios.get(`http://localhost:${app.env.msProdutosPort}/produtos`, {
        params: {
          ids: idProdutos.join(','),
        },
      });

      return (response.data as Listagem<ProdutoBuscaDTO>).data as ProdutoBuscaDTO[];
    } catch (err) {
      const { status, data } = err.response;

      throw new RequestError(status, data?.message);
    }
  }

  async salvar(carrinhoItemSalvarDTO: CarrinhoItemSalvarDTO, usuarioLogado: UsuarioLogadoDTO): Promise<CarrinhoItemSalvarResultadoDTO> {
    const { produtoId, quantidade } = carrinhoItemSalvarDTO;

    //valida se o produto existe
    await this.buscarProduto(produtoId);

    if (!(quantidade > 0)) {
      throw new BadRequestError('Quantidade do produto inválida');
    }

    const carrinhoItemModel = new CarrinhoItem();

    carrinhoItemModel.carrinho = await carrinhoRepository.findOne({ usuarioId: usuarioLogado.id });

    if (!carrinhoItemModel.carrinho) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    carrinhoItemModel.produtoId = produtoId;
    carrinhoItemModel.quantidade = quantidade;
    carrinhoItemModel.dataCadastro = new Date();
    carrinhoItemModel.ativo = true;

    const carrinhoItemSalvo = await carrinhoItemRepository.salvar(carrinhoItemModel);

    return new CarrinhoItemSalvarResultadoDTO(carrinhoItemSalvo);
  }

  async alterarQtd(carrinhoItemAlterarQtdDTO: CarrinhoItemAlterarQtdDTO, usuarioLogado: UsuarioLogadoDTO): Promise<CarrinhoItemSalvarResultadoDTO> {
    const { id, quantidade } = carrinhoItemAlterarQtdDTO;

    const carrinhoModel = await carrinhoRepository.findOne({ usuarioId: usuarioLogado.id });

    if (!carrinhoModel) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    const carrinhoItemModel = await carrinhoItemRepository.findOne({ id });

    if (!carrinhoItemModel) {
      throw new NotFoundError('Item do carrinho não encontrado');
    }

    if (carrinhoItemModel.carrinho.id != carrinhoModel.id) {
      throw new ForbiddenError('O item não pertence ao seu carrinho');
    }

    carrinhoItemModel.quantidade = Math.max(quantidade, 0);
    carrinhoItemModel.ativo = carrinhoItemModel.quantidade > 0;
    carrinhoItemModel.dataAlteracao = new Date();

    const carrinhoItemSalvo = await carrinhoItemRepository.salvar(carrinhoItemModel);

    return new CarrinhoItemSalvarResultadoDTO(carrinhoItemSalvo);
  }

  async remover(id: number, usuarioLogado: UsuarioLogadoDTO): Promise<void> {
    if (!isValidNumber(id)) {
      throw new BadRequestError('ID do item não informado');
    }

    const carrinhoItemModel = await carrinhoItemRepository.findOne({ id });

    if (!carrinhoItemModel) {
      throw new NotFoundError('Item do carrinho não encontrado');
    }

    const carrinhoModel = await carrinhoRepository.findOne(carrinhoItemModel.carrinho);

    if (!carrinhoModel) {
      throw new NotFoundError('Carrinho não encontrado');
    }

    if (carrinhoModel.usuarioId != usuarioLogado.id) {
      throw new ForbiddenError('O item não pertence ao seu carrinho');
    }

    carrinhoItemModel.ativo = false;
    carrinhoItemModel.dataAlteracao = new Date();

    await carrinhoItemRepository.salvar(carrinhoItemModel);
  }
}

export const carrinhoItemService = new CarrinhoItemService();