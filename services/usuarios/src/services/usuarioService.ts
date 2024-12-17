import { Encrypt } from 'node-backend-utils/utils';
import { signJWT } from 'node-backend-utils/auth';
import { isEmail } from 'class-validator';
import { validateBr } from 'js-brasil';
import { UsuarioCadastroDTO } from '../dtos/usuario/UsuarioCadastroDTO';
import { UsuarioLoginResultadoDTO } from '../dtos/usuario/UsuarioLoginResultadoDTO';
import { usuarioRepository } from '../repositories/usuarioRepository';
import { UsuarioLogadoDTO } from '../dtos/usuario/UsuarioLogadoDTO';
import { Usuario } from '../models/Usuario';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from 'node-backend-utils/classes';
import { isAfter, subYears } from 'date-fns';
import { cepApi } from '../apis/cep';
import { UsuarioLoginDTO } from '../dtos/usuario/UsuarioLoginDTO';
import { UsuarioBuscaDTO } from '../dtos/usuario/UsuarioBuscaDTO';
import { isValidNumber, isValidString } from 'node-backend-utils/validators';
import { UsuarioAtualizacaoDTO } from '../dtos/usuario/UsuarioAtualizacaoDTO';
import { app } from '../app';

export class UsuarioService {

  async cadastrar(usuarioCadastroDTO: UsuarioCadastroDTO): Promise<UsuarioLoginResultadoDTO> {
    const usuarioModel = new Usuario();

    //Dados do usuário
    usuarioModel.nome = usuarioCadastroDTO.nome.trim();
    usuarioModel.cpf = usuarioCadastroDTO.cpf;
    usuarioModel.dataNascimento = new Date(usuarioCadastroDTO.dataNascimento);

    //Endereço
    usuarioModel.rua = usuarioCadastroDTO.rua;
    usuarioModel.numero = usuarioCadastroDTO.numero;
    usuarioModel.cep = usuarioCadastroDTO.cep;

    //Contato
    usuarioModel.telefone = usuarioCadastroDTO.telefone;
    usuarioModel.email = usuarioCadastroDTO.email;

    //Parâmetros
    usuarioModel.ativo = true;
    usuarioModel.dataCadastro = new Date();

    //Gerar hash da senha
    usuarioModel.senha = Encrypt.hash(usuarioCadastroDTO.senha);

    /* ------------------------ VALIDAÇÕES ------------------------ */
    if (!validateBr.cpf(usuarioModel.cpf)) {
      throw new BadRequestError('CPF inválido');
    }

    //Verifica se o usuário tem mais de 18 anos
    if (isAfter(usuarioModel.dataNascimento, subYears(new Date(), 18))) {
      throw new ForbiddenError('Você deve ter 18 anos ou mais para se cadastrar');
    }

    const dadosCep = await cepApi.buscar(usuarioModel.cep);

    if (!dadosCep) {
      throw new NotFoundError(`CEP ${usuarioModel.cep} não encontrado`);
    }

    usuarioModel.ibgeCidade = dadosCep.ibge;

    const cpfJaCadastrado = await usuarioRepository.exists({ cpf: usuarioModel.cpf });

    if (cpfJaCadastrado) {
      throw new ConflictError('Já existe um usuário com este CPF');
    }

    const emailJaCadastrado = await usuarioRepository.exists({ email: usuarioModel.email });

    if (emailJaCadastrado) {
      throw new ConflictError('Já existe um usuário com este email');
    }

    const usuarioSalvo = await usuarioRepository.salvar(usuarioModel);

    const token = this.criaJWT(usuarioSalvo);

    return new UsuarioLoginResultadoDTO({ id: usuarioSalvo.id, token });
  }

  async login(usuarioLoginDTO: UsuarioLoginDTO): Promise<UsuarioLoginResultadoDTO> {
    const { login, senha } = usuarioLoginDTO;
    let usuarioModel: Usuario;

    if (validateBr.cpf(login)) {
      //login por cpf
      usuarioModel = await usuarioRepository.findOne({ cpf: login });
    } else if (isEmail(login)) {
      //login por email
      usuarioModel = await usuarioRepository.findOne({ email: login });
    } else {
      throw new BadRequestError('O login deve ser um email ou CPF válido');
    }

    if (!usuarioModel || !Encrypt.compare(senha, usuarioModel.senha)) {
      throw new NotFoundError('Login inválido');
    }

    const token = this.criaJWT(usuarioModel);

    return new UsuarioLoginResultadoDTO({ id: usuarioModel.id, token });
  }

  async buscarPorId(id: number, usuarioLogado: UsuarioLogadoDTO): Promise<UsuarioBuscaDTO> {
    if (!isValidNumber(id, { integer: true })) {
      throw new BadRequestError('ID do usuário não informado');
    }

    const usuarioModel = await usuarioRepository.findOne({ id });

    if (!usuarioModel) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (usuarioModel.id != usuarioLogado.id) {
      throw new ForbiddenError('Você não tem permissão para acessar este usuário');
    }

    return new UsuarioBuscaDTO(usuarioModel);
  }

  async atualizar(usuarioAtualizacaoDTO: UsuarioAtualizacaoDTO, usuarioLogado: UsuarioLogadoDTO): Promise<UsuarioBuscaDTO> {
    const usuarioModel = await usuarioRepository.findOne({ id: usuarioAtualizacaoDTO.id });

    if (!usuarioModel) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (usuarioModel.id != usuarioLogado.id) {
      throw new ForbiddenError('Você não tem permissão para acessar este usuário');
    }

    //Dados do usuário
    usuarioModel.nome = usuarioAtualizacaoDTO.nome.trim();
    usuarioModel.dataNascimento = new Date(usuarioAtualizacaoDTO.dataNascimento);

    //Endereço
    usuarioModel.rua = usuarioAtualizacaoDTO.rua;
    usuarioModel.numero = usuarioAtualizacaoDTO.numero;
    usuarioModel.cep = usuarioAtualizacaoDTO.cep;

    //Contato
    usuarioModel.telefone = usuarioAtualizacaoDTO.telefone;

    //Parâmetros
    usuarioModel.dataAlteracao = new Date();

    //Gerar hash da senha (caso for alterada)
    if (isValidString(usuarioAtualizacaoDTO.senha)) {
      usuarioModel.senha = Encrypt.hash(usuarioAtualizacaoDTO.senha);
    }

    /* ------------------------ VALIDAÇÕES ------------------------ */
    //Verifica se o usuário tem mais de 18 anos
    if (isAfter(usuarioModel.dataNascimento, subYears(new Date(), 18))) {
      throw new ForbiddenError('Você deve ter 18 anos ou mais para se cadastrar');
    }

    const dadosCep = await cepApi.buscar(usuarioModel.cep);

    if (!dadosCep) {
      throw new NotFoundError(`CEP ${usuarioModel.cep} não encontrado`);
    }

    usuarioModel.ibgeCidade = dadosCep.ibge;

    const usuarioSalvo = await usuarioRepository.salvar(usuarioModel);

    return await this.buscarPorId(usuarioSalvo.id, usuarioLogado);
  }

  //Cria JWT a partir de um usuário
  //O token referencia ao UsuarioLogadoDTO.toJSON, não ao model Usuario
  criaJWT(usuarioModel: Usuario): string {
    const usuarioLogadoDTO = new UsuarioLogadoDTO(usuarioModel);

    //JWT não aceita instância de classes, necessaário converter para objeto
    const usuarioJSON = UsuarioLogadoDTO.toJSON(usuarioLogadoDTO);

    const token = signJWT(usuarioJSON, app.env.jwtSecret, {
      expiresIn: app.env.jwtExpiresIn,
    });

    return token;
  }

  //soft delete: Usuario.ativo
  async deletar(id: number, usuarioLogado: UsuarioLogadoDTO): Promise<void> {
    if (!isValidNumber(id, { integer: true })) {
      throw new BadRequestError('ID do usuário não informado');
    }

    const usuarioModel = await usuarioRepository.findOne({ id });

    if (!usuarioModel) {
      throw new NotFoundError('Usuário não encontrado');
    }

    if (usuarioModel.id != usuarioLogado.id) {
      throw new ForbiddenError('Você não tem permissão para acessar este usuário');
    }

    usuarioModel.ativo = false;
    usuarioModel.dataAlteracao = new Date();

    await usuarioRepository.salvar(usuarioModel);
  }
}

export const usuarioService = new UsuarioService();