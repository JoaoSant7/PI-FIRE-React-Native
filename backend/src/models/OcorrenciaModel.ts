// src/models/OcorrenciaModel.ts
import db from '../database/connection';
import { Ocorrencia, CreateOcorrenciaDTO, UpdateOcorrenciaDTO } from '../types';

// Mapeamento de campos snake_case para camelCase
const mapToOcorrencia = (row: any): Ocorrencia => ({
  id: row.id,
  dataHora: row.data_hora,
  numeroAviso: row.numero_aviso,
  diretoria: row.diretoria,
  grupamento: row.grupamento,
  pontoBase: row.ponto_base,
  natureza: row.natureza,
  grupoOcorrencia: row.grupo_ocorrencia,
  subgrupoOcorrencia: row.subgrupo_ocorrencia,
  situacao: row.situacao,
  horaSaidaQuartel: row.hora_saida_quartel,
  horaChegadaLocal: row.hora_chegada_local,
  horaLocal: row.hora_local,
  horaSaidaLocal: row.hora_saida_local,
  motivoNaoAtendida: row.motivo_nao_atendida,
  motivoOutro: row.motivo_outro,
  vitimaSamu: Boolean(row.vitima_samu),
  envolvida: Boolean(row.envolvida),
  sexo: row.sexo,
  idade: row.idade,
  classificacao: row.classificacao,
  destino: row.destino,
  viatura: row.viatura,
  numeroViatura: row.numero_viatura,
  acionamento: row.acionamento,
  localAcionamento: row.local_acionamento,
  municipio: row.municipio,
  regiao: row.regiao,
  bairro: row.bairro,
  tipoLogradouro: row.tipo_logradouro,
  ais: row.ais,
  logradouro: row.logradouro,
  latitude: row.latitude,
  longitude: row.longitude,
  status: row.status,
  tipo: row.tipo,
  descricao: row.descricao,
  localizacao: row.localizacao,
  dataCriacao: row.created_at,
  dataAtualizacao: row.updated_at,
  tempoResposta: row.tempo_resposta,
  fotos: row.fotos ? JSON.parse(row.fotos) : [],
  sincronizado: Boolean(row.sincronizado)
});

// Mapeamento de camelCase para snake_case
const mapFromOcorrencia = (data: CreateOcorrenciaDTO | UpdateOcorrenciaDTO): any => ({
  data_hora: data.dataHora,
  numero_aviso: data.numeroAviso,
  diretoria: data.diretoria,
  grupamento: data.grupamento,
  ponto_base: data.pontoBase,
  natureza: data.natureza,
  grupo_ocorrencia: data.grupoOcorrencia,
  subgrupo_ocorrencia: data.subgrupoOcorrencia,
  situacao: data.situacao,
  hora_saida_quartel: data.horaSaidaQuartel,
  hora_chegada_local: data.horaChegadaLocal || data.horaLocal,
  hora_local: data.horaLocal || data.horaChegadaLocal,
  hora_saida_local: data.horaSaidaLocal,
  motivo_nao_atendida: data.motivoNaoAtendida,
  motivo_outro: data.motivoOutro,
  vitima_samu: data.vitimaSamu,
  envolvida: data.envolvida,
  sexo: data.sexo,
  idade: data.idade,
  classificacao: data.classificacao,
  destino: data.destino,
  viatura: data.viatura,
  numero_viatura: data.numeroViatura,
  acionamento: data.acionamento,
  local_acionamento: data.localAcionamento,
  municipio: data.municipio,
  regiao: data.regiao,
  bairro: data.bairro,
  tipo_logradouro: data.tipoLogradouro,
  ais: data.ais,
  logradouro: data.logradouro,
  latitude: data.latitude,
  longitude: data.longitude,
  descricao: data.descricao,
  fotos: data.fotos ? JSON.stringify(data.fotos) : JSON.stringify([])
});

export class OcorrenciaModel {
  // Listar todas com filtros
  static async findAll(filters?: {
    situacao?: string;
    natureza?: string;
    municipio?: string;
    dataInicio?: string;
    dataFim?: string;
  }): Promise<Ocorrencia[]> {
    let query = db('ocorrencias');

    if (filters) {
      if (filters.situacao) {
        query = query.where('situacao', filters.situacao);
      }
      if (filters.natureza) {
        query = query.where('natureza', filters.natureza);
      }
      if (filters.municipio) {
        query = query.where('municipio', filters.municipio);
      }
      if (filters.dataInicio) {
        query = query.where('data_hora', '>=', filters.dataInicio);
      }
      if (filters.dataFim) {
        query = query.where('data_hora', '<=', filters.dataFim);
      }
    }

    const rows = await query.orderBy('data_hora', 'desc');
    return rows.map(mapToOcorrencia);
  }

  // Buscar por ID
  static async findById(id: string): Promise<Ocorrencia | undefined> {
    const row = await db('ocorrencias').where('id', id).first();
    return row ? mapToOcorrencia(row) : undefined;
  }

  // Criar nova
  static async create(data: CreateOcorrenciaDTO): Promise<Ocorrencia> {
    const id = `occ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const dbData = {
      id,
      ...mapFromOcorrencia(data),
      status: data.situacao,
      tipo: data.natureza,
      localizacao: `${data.logradouro}, ${data.bairro || data.municipio}`,
      sincronizado: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await db('ocorrencias').insert(dbData);
    
    const created = await db('ocorrencias').where('id', id).first();
    return mapToOcorrencia(created);
  }

  // Atualizar
  static async update(id: string, data: UpdateOcorrenciaDTO): Promise<Ocorrencia | null> {
    const exists = await db('ocorrencias').where('id', id).first();
    
    if (!exists) {
      return null;
    }

    const dbData = {
      ...mapFromOcorrencia(data),
      updated_at: new Date().toISOString()
    };

    await db('ocorrencias').where('id', id).update(dbData);
    
    const updated = await db('ocorrencias').where('id', id).first();
    return mapToOcorrencia(updated);
  }

  // Deletar
  static async delete(id: string): Promise<boolean> {
    const deleted = await db('ocorrencias').where('id', id).del();
    return deleted > 0;
  }

  // Estatísticas
  static async getStatistics() {
    const total = await db('ocorrencias').count('* as count').first();
    const atendidas = await db('ocorrencias').where('situacao', 'Atendida').count('* as count').first();
    const naoAtendidas = await db('ocorrencias').where('situacao', 'Não Atendida').count('* as count').first();
    
    const emAndamento = await db('ocorrencias')
      .whereNotIn('situacao', ['Atendida', 'Não Atendida', 'Cancelada'])
      .count('* as count')
      .first();

    // Tempo médio
    const tempoMedio = await db('ocorrencias')
      .whereNotNull('tempo_resposta')
      .avg('tempo_resposta as media')
      .first();

    // Por natureza
    const porNatureza = await db('ocorrencias')
      .select('natureza')
      .count('* as count')
      .groupBy('natureza');

    // Por região
    const porRegiao = await db('ocorrencias')
      .select('regiao')
      .count('* as count')
      .groupBy('regiao');

    // Por município
    const porMunicipio = await db('ocorrencias')
      .select('municipio')
      .count('* as count')
      .groupBy('municipio');

    return {
      total: total?.count || 0,
      atendidas: atendidas?.count || 0,
      emAndamento: emAndamento?.count || 0,
      naoAtendidas: naoAtendidas?.count || 0,
      tempoMedioResposta: `${Math.round(tempoMedio?.media || 0)}min`,
      porNatureza: porNatureza.reduce((acc, curr) => ({ ...acc, [curr.natureza]: curr.count }), {}),
      porRegiao: porRegiao.reduce((acc, curr) => ({ ...acc, [curr.regiao]: curr.count }), {}),
      porMunicipio: porMunicipio.reduce((acc, curr) => ({ ...acc, [curr.municipio]: curr.count }), {})
    };
  }
}

export default OcorrenciaModel;
