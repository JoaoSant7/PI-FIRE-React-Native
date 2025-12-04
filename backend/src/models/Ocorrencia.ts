// src/models/Ocorrencia.ts
import { Ocorrencia, CreateOcorrenciaDTO, UpdateOcorrenciaDTO } from '../types';

// Banco de dados em memória
let ocorrencias: Ocorrencia[] = [
  {
    id: 'occ_1',
    dataHora: '2024-01-15T10:30:00.000Z',
    numeroAviso: '2024011510300001',
    diretoria: 'DIM',
    grupamento: 'GBAPH',
    pontoBase: 'Base Central',
    natureza: 'APH',
    grupoOcorrencia: 'Emergências Clínicas Diversas',
    subgrupoOcorrencia: 'Queda da Própria Altura',
    situacao: 'Atendida',
    horaSaidaQuartel: '10:35:00',
    horaLocal: '10:42:00',
    horaSaidaLocal: '11:15:00',
    vitimaSamu: false,
    envolvida: true,
    sexo: 'Masculino',
    idade: '45',
    classificacao: 'Ferida leve',
    destino: 'Entregue ao Hospital',
    viatura: 'ASE-01',
    numeroViatura: '1234',
    acionamento: 'CIODS',
    localAcionamento: 'Central de Operações',
    municipio: 'Recife',
    regiao: 'RMR',
    bairro: 'Boa Vista',
    tipoLogradouro: 'RUA',
    ais: '05',
    logradouro: 'Rua da Aurora',
    latitude: '-8.0578',
    longitude: '-34.8829',
    dataCriacao: '2024-01-15T10:30:00.000Z',
    dataAtualizacao: '2024-01-15T11:15:00.000Z',
    tempoResposta: 7,
    fotos: [],
    sincronizado: true,
    status: 'Atendida',
    tipo: 'APH',
    descricao: 'Vítima com queda da própria altura',
    localizacao: 'Rua da Aurora, Boa Vista'
  },
  {
    id: 'occ_2',
    dataHora: '2024-01-16T14:20:00.000Z',
    numeroAviso: '2024011614200002',
    diretoria: 'DIM',
    grupamento: 'GBI',
    pontoBase: 'Base Norte',
    natureza: 'INCÊNDIO',
    grupoOcorrencia: 'Incêndio em Edificação Residencial',
    subgrupoOcorrencia: 'Unifamiliar Casa Residência',
    situacao: 'Atendida',
    horaSaidaQuartel: '14:25:00',
    horaLocal: '14:35:00',
    horaSaidaLocal: '16:00:00',
    vitimaSamu: false,
    envolvida: false,
    viatura: 'ABT-05',
    numeroViatura: '5678',
    acionamento: 'PESSOALMENTE',
    localAcionamento: 'Local da ocorrência',
    municipio: 'Olinda',
    regiao: 'RMR',
    bairro: 'Casa Caiada',
    tipoLogradouro: 'AVENIDA',
    ais: '03',
    logradouro: 'Avenida Getúlio Vargas',
    latitude: '-8.0089',
    longitude: '-34.8553',
    dataCriacao: '2024-01-16T14:20:00.000Z',
    dataAtualizacao: '2024-01-16T16:00:00.000Z',
    tempoResposta: 10,
    fotos: [],
    sincronizado: true,
    status: 'Atendida',
    tipo: 'INCÊNDIO',
    descricao: 'Incêndio em residência unifamiliar',
    localizacao: 'Avenida Getúlio Vargas, Casa Caiada'
  }
];

export class OcorrenciaModel {
  // Listar todas
  static findAll(filters?: {
    situacao?: string;
    natureza?: string;
    municipio?: string;
    dataInicio?: string;
    dataFim?: string;
  }): Ocorrencia[] {
    let resultado = [...ocorrencias];

    if (filters) {
      if (filters.situacao) {
        resultado = resultado.filter(occ => occ.situacao === filters.situacao);
      }
      if (filters.natureza) {
        resultado = resultado.filter(occ => occ.natureza === filters.natureza);
      }
      if (filters.municipio) {
        resultado = resultado.filter(occ => occ.municipio === filters.municipio);
      }
      if (filters.dataInicio) {
        resultado = resultado.filter(occ => new Date(occ.dataHora) >= new Date(filters.dataInicio!));
      }
      if (filters.dataFim) {
        resultado = resultado.filter(occ => new Date(occ.dataHora) <= new Date(filters.dataFim!));
      }
    }

    // Ordenar por data (mais recente primeiro)
    return resultado.sort((a, b) => 
      new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
    );
  }

  // Buscar por ID
  static findById(id: string): Ocorrencia | undefined {
    return ocorrencias.find(occ => occ.id === id);
  }

  // Criar nova
  static create(data: CreateOcorrenciaDTO): Ocorrencia {
    const novaOcorrencia: Ocorrencia = {
      id: `occ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      sincronizado: true,
      status: data.situacao,
      tipo: data.natureza,
      localizacao: `${data.logradouro}, ${data.bairro || data.municipio}`,
    };

    ocorrencias.push(novaOcorrencia);
    return novaOcorrencia;
  }

  // Atualizar
  static update(id: string, data: UpdateOcorrenciaDTO): Ocorrencia | null {
    const index = ocorrencias.findIndex(occ => occ.id === id);
    
    if (index === -1) {
      return null;
    }

    ocorrencias[index] = {
      ...ocorrencias[index],
      ...data,
      dataAtualizacao: new Date().toISOString(),
    };

    return ocorrencias[index];
  }

  // Deletar
  static delete(id: string): boolean {
    const index = ocorrencias.findIndex(occ => occ.id === id);
    
    if (index === -1) {
      return false;
    }

    ocorrencias.splice(index, 1);
    return true;
  }

  // Estatísticas para o Dashboard
  static getStatistics() {
    const total = ocorrencias.length;
    const atendidas = ocorrencias.filter(occ => occ.situacao === 'Atendida').length;
    const emAndamento = ocorrencias.filter(occ => 
      occ.situacao !== 'Atendida' && 
      occ.situacao !== 'Não Atendida' && 
      occ.situacao !== 'Cancelada'
    ).length;
    const naoAtendidas = ocorrencias.filter(occ => occ.situacao === 'Não Atendida').length;

    // Tempo médio de resposta
    const tempos = ocorrencias
      .filter(occ => occ.tempoResposta)
      .map(occ => occ.tempoResposta!);
    const tempoMedio = tempos.length > 0 
      ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length)
      : 0;

    // Por natureza
    const porNatureza: Record<string, number> = {};
    ocorrencias.forEach(occ => {
      porNatureza[occ.natureza] = (porNatureza[occ.natureza] || 0) + 1;
    });

    // Por região
    const porRegiao: Record<string, number> = {};
    ocorrencias.forEach(occ => {
      porRegiao[occ.regiao] = (porRegiao[occ.regiao] || 0) + 1;
    });

    // Por município
    const porMunicipio: Record<string, number> = {};
    ocorrencias.forEach(occ => {
      porMunicipio[occ.municipio] = (porMunicipio[occ.municipio] || 0) + 1;
    });

    return {
      total,
      atendidas,
      emAndamento,
      naoAtendidas,
      tempoMedioResposta: `${tempoMedio}min`,
      porNatureza,
      porRegiao,
      porMunicipio,
    };
  }
}

export default OcorrenciaModel;