export interface User {
  id: number;
  cpf: string;
  nome: string;
  senhaHash: string;
  posto: string;
  created_at: string;
}

export interface Ocorrencia {
  id?: number | string;          // id local ou uuid
  numeroAviso: string;
  natureza: string;
  municipio: string;
  bairro: string;
  logradouro: string;
  latitude: string;
  longitude: string;
  descricao: string;
  fotos?: string[];              // urls
  sincronizado?: boolean;
  dataCriacao: string;
  userId?: number;
}