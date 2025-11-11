// constants/ocorrencias.js

// Regiões organizadas em ordem alfabética
export const REGIOES = [
  { label: 'AGRESTE', value: 'AGRESTE' },
  { label: 'RMR', value: 'RMR' },
  { label: 'SERTÃO', value: 'SERTÃO' },
  { label: 'ZONA DA MATA', value: 'ZONA DA MATA' },
];

export const GRUPAMENTOS = [
  { label: 'GBAPH', value: 'GBAPH' },
  { label: 'GBI', value: 'GBI' },
  { label: 'GBMar', value: 'GBMar' },
  { label: 'GBS', value: 'GBS' },
];

export const NATUREZAS = [
  { label: 'APH', value: 'APH' },
  { label: 'INCÊNDIO', value: 'Incêndio' },
  { label: 'PREVENÇÃO', value: 'PREVENÇÃO' },
  { label: 'PRODUTOS PERIGOSOS', value: 'PRODUTOS PERIGOSOS' },
  { label: 'SALVAMENTO', value: 'Resgate' },
];

// Grupos de ocorrência organizados alfabeticamente
export const GRUPOS_OCORRENCIA = [
  { label: "Acidente de Trânsito Atropelamento", value: "Acidente de Trânsito Atropelamento" },
  { label: "Acidente de Trânsito Choque", value: "Acidente de Trânsito Choque" },
  { label: "Acidente de Trânsito Colisão Abalroamento", value: "Acidente de Trânsito Colisão Abalroamento" },
  { label: "Apoio em Operações", value: "Apoio em Operações" },
  { label: "APH Diversos", value: "APH Diversos" },
  { label: "Emergência Cardíaca", value: "Emergência Cardíaca" },
  { label: "Emergência Respiratória", value: "Emergência Respiratória" },
  { label: "Emergências Clínicas Diversas", value: "Emergências Clínicas Diversas" },
  { label: "Evento com Animal", value: "Evento com Animal" },
  { label: "Evento com Árvores", value: "Evento com Árvores" },
  { label: "Evento com Cadáver", value: "Evento com Cadáver" },
  { label: "Evento com Meio de Transporte", value: "Evento com Meio de Transporte" },
  { label: "Evento com Pessoa", value: "Evento com Pessoa" },
  { label: "Evento Esportivo", value: "Evento Esportivo" },
  { label: "Evento Festivo", value: "Evento Festivo" },
  { label: "Explosão", value: "Explosão" },
  { label: "Incêndio em Edificação Concentração de Público", value: "Incêndio em Edificação Concentração de Público" },
  { label: "Incêndio em Edificação Escolar", value: "Incêndio em Edificação Escolar" },
  { label: "Incêndio em Edificação Industrial", value: "Incêndio em Edificação Industrial" },
  { label: "Incêndio em Edificação Outros", value: "Incêndio em Edificação Outros" },
  { label: "Incêndio em Edificação Residencial", value: "Incêndio em Edificação Residencial" },
  { label: "Incêndio em Meio de Transporte Terrestre", value: "Incêndio em Meio de Transporte Terrestre" },
  { label: "Incêndio em Vegetação", value: "Incêndio em Vegetação" },
  { label: "Incêndio em Via Pública", value: "Incêndio em Via Pública" },
  { label: "Incêndios Diversos", value: "Incêndios Diversos" },
  { label: "Prevenção Aquática", value: "Prevenção Aquática" },
  { label: "Prevenção Diversos", value: "Prevenção Diversos" },
  { label: "Queda", value: "Queda" },
  { label: "Vazamento", value: "Vazamento" },
  { label: "Vítima de Agressão", value: "Vítima de Agressão" }
].sort((a, b) => a.label.localeCompare(b.label));

export const SUBGRUPOS_OCORRENCIA = [
  { label: 'Desmaio', value: 'Desmaio' },
  { label: 'Outros', value: 'Outros' },
  { label: 'Queda da Própria Altura', value: 'Queda da Própria Altura' },
  { label: 'Queda de Altura', value: 'Queda de Altura' },
];

export const SITUACOES = [
  { label: 'Atendida', value: 'Atendida' },
  { label: 'Não Atendida', value: 'Não Atendida' },
  { label: 'Sem Atuação', value: 'Sem Atuação' },
];

export const SEXOS = [
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Outro', value: 'Outro' },
];

export const CLASSIFICACOES = [
  { label: 'Ferida grave', value: 'Ferida grave' },
  { label: 'Ferida leve', value: 'Ferida leve' },
  { label: 'Óbito', value: 'Óbito' },
  { label: 'Vítima ilesa', value: 'Vítima ilesa' },
];

export const DESTINOS = [
  { label: 'Encaminhado ao Suporte Avançado', value: 'Encaminhado ao Suporte Avançado' },
  { label: 'Encaminhado ao Suporte Básico', value: 'Encaminhado ao Suporte Básico' },
  { label: 'Entregue ao Hospital', value: 'Entregue ao Hospital' },
  { label: 'Óbito', value: 'Óbito' },
  { label: 'Outro', value: 'Outro' },
  { label: 'Permaneceu no Local após atendimento', value: 'Permaneceu no Local após atendimento' },
];

export const ACIONAMENTOS = [
  { label: 'CIODS', value: 'CIODS' },
  { label: 'CO DO GRUPAMENTO', value: 'CO DO GRUPAMENTO' },
  { label: 'OUTRO', value: 'OUTRO' },
  { label: 'PESSOALMENTE', value: 'PESSOALMENTE' },
];

export const TIPOS_LOGRADOURO = [
  { label: 'ALAMEDA', value: 'ALAMEDA' },
  { label: 'AVENIDA', value: 'AVENIDA' },
  { label: 'ESTRADA', value: 'ESTRADA' },
  { label: 'RUA', value: 'RUA' },
  { label: 'TRAVESSA', value: 'TRAVESSA' },
];

// Export padrão
export default GRUPOS_OCORRENCIA;