import axios from 'axios';
import { Cliente, ServicoTI, SolicitacaoServico, AuthResponse, ApiResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const authService = {
  login: async (login: string, senha: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/clientes/login', { login, senha });
    return response.data;
  },

  trocarSenha: async (login: string, senhaAtual: string, novaSenha: string): Promise<AuthResponse> => {
    const response = await api.put<AuthResponse>(`/clientes/${login}/senha`, {
      senhaAtual,
      novaSenha
    });
    return response.data;
  }
};

export const clienteService = {
  cadastrar: async (cliente: Cliente): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/clientes', cliente);
    return response.data;
  }
};

export const servicoTIService = {
  cadastrar: async (servico: ServicoTI): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>('/servicos', servico);
    return response.data;
  },

  listar: async (): Promise<ApiResponse<ServicoTI[]>> => {
    const response = await api.get<ApiResponse<ServicoTI[]>>('/servicos');
    return response.data;
  }
};

export const solicitacaoService = {
  listarPorCliente: async (login: string): Promise<ApiResponse<SolicitacaoServico[]>> => {
    const response = await api.get<ApiResponse<SolicitacaoServico[]>>(`/solicitacoes/${login}`);
    return response.data;
  },

  atualizar: async (login: string, solicitacoes: SolicitacaoServico[]): Promise<ApiResponse<void>> => {
    const response = await api.put<ApiResponse<void>>(`/solicitacoes/${login}`, { solicitacoes });
    return response.data;
  }
}; 