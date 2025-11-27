// src/types/index.ts

export interface Ocorrencia {
  id: string;
  
  // Dados Internos
  dataHora: string;
  numeroAviso: string;
  diretoria: string;
  grupamento: string;
  pontoBase: string;
  
  // Ocorrência
  natureza: string;
  grupoOcorrencia: string;
  subgrupoOcorrencia: string;
  situacao: string;
  horaSaidaQuartel: string;
  horaChegadaLocal?: string;
  horaLocal?: string;
  horaSaidaLocal: string;
  motivoNaoAtendida?: string;
  motivoOutro?: string;
  vitimaSamu: boolean;
  
  // Vítima
  envolvida: boolean;
  sexo?: string;
  idade?: string;
  classificacao?: string;
  destino?: string;
  
  // Viatura
  viatura?: string;
  numeroViatura?: string;
  acionamento?: string;
  localAcionamento?: string;
  
  // Endereço
  municipio: string;
  regiao: string;
  bairro?: string;
  tipoLogradouro: string;
  ais?: string;
  logradouro: string;
  latitude?: string;
  longitude?: string;
  
  // Metadados
  status?: string;
  tipo?: string;
  descricao?: string;
  localizacao?: string;
  dataCriacao: string;
  dataAtualizacao: string;
  tempoResposta?: number;
  
  // Fotos
  fotos?: string[];
  
  // Controle
  sincronizado?: boolean;
}

export interface CreateOcorrenciaDTO {
  dataHora: string;
  numeroAviso: string;
  diretoria: string;
  grupamento: string;
  pontoBase: string;
  natureza: string;
  grupoOcorrencia: string;
  subgrupoOcorrencia: string;
  situacao: string;
  horaSaidaQuartel: string;
  horaChegadaLocal?: string;
  horaLocal?: string;
  horaSaidaLocal: string;
  motivoNaoAtendida?: string;
  motivoOutro?: string;
  vitimaSamu: boolean;
  envolvida: boolean;
  sexo?: string;
  idade?: string;
  classificacao?: string;
  destino?: string;
  viatura?: string;
  numeroViatura?: string;
  acionamento?: string;
  localAcionamento?: string;
  municipio: string;
  regiao: string;
  bairro?: string;
  tipoLogradouro: string;
  ais?: string;
  logradouro: string;
  latitude?: string;
  longitude?: string;
  fotos?: string[];
  descricao?: string;
}

export interface UpdateOcorrenciaDTO extends Partial<CreateOcorrenciaDTO> {}

export interface Usuario {
  id: string;
  email: string;
  senha: string;
  nome: string;
  matricula: string;
  funcao: string;
  batalhao: string;
  telefone?: string;
  idade?: number;
  anoNascimento?: number;
  tipoSanguineo?: string;
  dataCriacao: string;
  dataAtualizacao: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  usuario: Omit<Usuario, 'senha'>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}