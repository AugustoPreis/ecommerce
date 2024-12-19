import { UUID } from 'crypto';
import { isValidArray, isValidNumber, isValidString } from 'node-backend-utils/validators';
import { ProdutoListagemFiltroDTO } from '../dtos/produto/ProdutoListagemFiltroDTO';
import { Database } from '../config/database';
import { Produto } from '../models/Produto';
import { OrderBy } from '../types/OrderBy';

export class ProdutoRepository {
  private readonly repository = Database.getRepository(Produto);

  async find(filtro: ProdutoListagemFiltroDTO): Promise<[Produto[], number]> {
    const qb = this.repository.createQueryBuilder('prod');

    //Joins
    qb.innerJoinAndSelect('prod.marca', 'marca');
    qb.innerJoinAndSelect('prod.categoria', 'categoria');

    //Parâmetros padrão
    qb.where('prod.ativo IS TRUE');

    //Parâmetros opcionais
    const { ids, nome, categoriaId, marcaId, valorMin, valorMax, pagina, itensPagina, ordem, ordenarPor } = filtro;

    if (isValidArray(ids)) {
      const validIds = ids.filter((el) => isValidNumber(el));

      if (validIds.length > 0) {
        qb.andWhere('prod.id IN (:...ids)', { ids: validIds });
      }
    }

    if (isValidString(nome)) {
      qb.andWhere(`prod.nome ILIKE '%' || :nome || '%'`, { nome });
    }

    if (isValidNumber(categoriaId)) {
      qb.andWhere('prod.categoria = :categoriaId', { categoriaId });
    }

    if (isValidNumber(marcaId)) {
      qb.andWhere('prod.marca = :marcaId', { marcaId });
    }

    if (isValidNumber(valorMin)) {
      qb.andWhere('prod.valor >= :valorMin', { valorMin });
    }

    if (isValidNumber(valorMax)) {
      qb.andWhere('prod.valor <= :valorMax', { valorMax });
    }

    if (isValidNumber(pagina) && isValidNumber(itensPagina)) {
      /*
        Obter a quantidade de itens já mostrados
        Ex: pagina 3, itensPagina 5

          pular = (3 - 1) * 5

          10 itens serão pulados, mostrando do 11 ao 15
      */
      const pular = (pagina - 1) * itensPagina;

      qb.limit(itensPagina).offset(pular);
    }

    //Ordenação
    const order: OrderBy<Produto> = {
      by: 'nome',
      direction: 'ASC',
    };

    if (isValidString(ordem) && ['ASC', 'DESC'].includes(ordem.toUpperCase())) {
      order.direction = ordem.toUpperCase() as 'ASC' | 'DESC';
    }

    if (isValidString(ordenarPor) && ['id', 'nome', 'marca', 'categoria', 'valor'].includes(ordenarPor.toLowerCase())) {
      order.by = ordenarPor.toLowerCase() as keyof Produto;
    }

    qb.orderBy(`prod.${order.by}`, order.direction);

    return await qb.getManyAndCount();
  }

  async findOne(produtoModel: Partial<Produto>): Promise<Produto> {
    return await this.repository.findOne({
      relations: ['marca', 'categoria'],
      where: {
        ...produtoModel,
        ativo: true,
      },
    });
  }

  async findFoto(uuid: UUID): Promise<Buffer> {
    const produto = await this.repository.findOne({
      where: { uuid },
      select: ['foto'],
    });

    return produto?.foto;
  }
}

export const produtoRepository = new ProdutoRepository();