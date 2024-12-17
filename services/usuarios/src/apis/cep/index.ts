import axios, { AxiosInstance } from 'axios';
import { CEPResponse } from '../../types/CepApi';

export class CepApi {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://viacep.com.br/ws',
    });
  }

  async buscar(cep: string, responseType = 'json'): Promise<CEPResponse> {
    const { data } = await this.client.get(`/${cep}/${responseType}`);

    if (!data || data.erro) {
      return null;
    }

    return data;
  }
}

export const cepApi = new CepApi();