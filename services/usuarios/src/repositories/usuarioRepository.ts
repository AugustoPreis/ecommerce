import { Database } from '../config/database';
import { Usuario } from '../models/Usuario';

export class UsuarioRepository {
  private readonly repository = Database.getRepository(Usuario);

  async exists(usuarioModel: Partial<Usuario>): Promise<boolean> {
    const count = await this.repository.countBy({
      ...usuarioModel,
      ativo: true,
    });

    return count > 0;
  }

  async findOne(usuarioModel: Partial<Usuario>): Promise<Usuario> {
    return await this.repository.findOneBy({
      ...usuarioModel,
      ativo: true,
    });
  }

  async salvar(usuarioModel: Usuario): Promise<Usuario> {
    return await this.repository.save(usuarioModel);
  }
}

export const usuarioRepository = new UsuarioRepository();