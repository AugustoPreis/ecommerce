import { NotFoundError } from 'node-backend-utils/classes';
import { CarrinhoCadastroResultadoDTO } from '../dtos/carrinho/CarrinhoCadastroResultadoDTO';
import { UsuarioLogadoDTO } from '../dtos/usuario/UsuarioLogadoDTO';
import { CarrinhoConsultaRetornoDTO } from '../dtos/carrinho/CarrinhoConsultaRetornoDTO';
import { Carrinho } from '../models/Carrinho';
import { carrinhoRepository } from '../repositories/carrinhoRepository';
import { carrinhoItemService } from './carrinhoItemService';

export class CarrinhoService {

  async buscar(usuarioLogado: UsuarioLogadoDTO, savedUser?: boolean): Promise<CarrinhoConsultaRetornoDTO> {
    const carrinhoModel = await carrinhoRepository.findOne({ usuarioId: usuarioLogado.id });

    /*
      Salva o carrinho e chama a função novamente
      Verifica o parâmetro savedUser, para evitar loops
    */
    if (!carrinhoModel && !savedUser) {
      await this.salvar(usuarioLogado);

      return await this.buscar(usuarioLogado, true);
    }

    if (!carrinhoModel) {
      throw new NotFoundError('Não foi possível encontrar o carrinho');
    }

    const carrinhoConsultaRetornoDTO = new CarrinhoConsultaRetornoDTO(carrinhoModel);

    carrinhoConsultaRetornoDTO.itens = await carrinhoItemService.listar(carrinhoModel);;

    return carrinhoConsultaRetornoDTO;
  }

  async salvar(usuarioLogado: UsuarioLogadoDTO): Promise<CarrinhoCadastroResultadoDTO> {
    const carrinhoModel = new Carrinho();

    carrinhoModel.usuarioId = usuarioLogado.id;
    carrinhoModel.dataCadastro = new Date();
    carrinhoModel.ativo = true;

    const carrinhoSalvo = await carrinhoRepository.salvar(carrinhoModel);

    return new CarrinhoCadastroResultadoDTO(carrinhoSalvo);
  }
}

export const carrinhoService = new CarrinhoService();