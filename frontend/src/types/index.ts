export interface Cliente {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  email: string;
}

export interface ServicoTI {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
}

export interface SolicitacaoServico {
  id?: number;
  clienteId: number;
  servicoId: number;
  dataSolicitacao: string;
  status: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
} 