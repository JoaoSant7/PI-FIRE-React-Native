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
  { label: 'Afogamento', value: 'Afogamento' },
  { label: 'Agência Bancária', value: 'Agência Bancária' },
  { label: 'Arma Branca', value: 'Arma Branca' },
  { label: 'Auto Passeio', value: 'Auto Passeio' },
  { label: 'Auto Passeio x Auto Passeio', value: 'Auto Passeio x Auto Passeio' },
  { label: 'Auto Passeio x Bicicleta', value: 'Auto Passeio x Bicicleta' },
  { label: 'Auto Passeio x Motocicleta', value: 'Auto Passeio x Motocicleta' },
  { label: 'Auto Passeio x Ônibus ou Micro-Ônibus', value: 'Auto Passeio x Ônibus ou Micro-Ônibus' },
  { label: 'Auto Passeio x Van ou Similar', value: 'Auto Passeio x Van ou Similar' },
  { label: 'Bar/Lanchonete ou Similar', value: 'Bar/Lanchonete ou Similar' },
  { label: 'Barbearia/Salão de Beleza ou Similar', value: 'Barbearia/Salão de Beleza ou Similar' },
  { label: 'Bicicleta', value: 'Bicicleta' },
  { label: 'Caminhão', value: 'Caminhão' },
  { label: 'Canino Cão', value: 'Canino Cão' },
  { label: 'Convulsão', value: 'Convulsão' },
  { label: 'Crise Hipertensiva', value: 'Crise Hipertensiva' },
  { label: 'Deslizamento/Escorregamento', value: 'Deslizamento/Escorregamento' },
  { label: 'Desmaio /Síncope', value: 'Desmaio /Síncope' },
  { label: 'Diversos', value: 'Diversos' },
  { label: 'Distúrbio Mental com Risco', value: 'Distúrbio Mental com Risco' },
  { label: 'Ensino Superior', value: 'Ensino Superior' },
  { label: 'Equino', value: 'Equino' },
  { label: 'Fábrica ou Revenda de Artefato Explosivo', value: 'Fábrica ou Revenda de Artefato Explosivo' },
  { label: 'Fábrica ou Revenda de Fogos de Artifício', value: 'Fábrica ou Revenda de Fogos de Artifício' },
  { label: 'Felino Gato', value: 'Felino Gato' },
  { label: 'Fiação Elétrica de Poste', value: 'Fiação Elétrica de Poste' },
  { label: 'Física', value: 'Física' },
  { label: 'Fogo', value: 'Fogo' },
  { label: 'Gravidez', value: 'Gravidez' },
  { label: 'Igreja/Templo ou Similar', value: 'Igreja/Templo ou Similar' },
  { label: 'Inseto Abelha', value: 'Inseto Abelha' },
  { label: 'Inseto Maribondo', value: 'Inseto Maribondo' },
  { label: 'Inseto Outro', value: 'Inseto Outro' },
  { label: 'Intoxicação Endógena', value: 'Intoxicação Endógena' },
  { label: 'Local Especial para Tratamento e Reciclagem', value: 'Local Especial para Tratamento e Reciclagem' },
  { label: 'Mangue', value: 'Mangue' },
  { label: 'Mato', value: 'Mato' },
  { label: 'Máquina Agrícola', value: 'Máquina Agrícola' },
  { label: 'Mercado', value: 'Mercado' },
  { label: 'Moto', value: 'Moto' },
  { label: 'Motocicleta', value: 'Motocicleta' },
  { label: 'Motocicleta x Motocicleta', value: 'Motocicleta x Motocicleta' },
  { label: 'Motocicleta x Ônibus ou Micro-Ônibus', value: 'Motocicleta x Ônibus ou Micro-Ônibus' },
  { label: 'Motocicleta x Veículo de Carga Não Perigosa', value: 'Motocicleta x Veículo de Carga Não Perigosa' },
  { label: 'Multifamiliar Casas Conjugadas', value: 'Multifamiliar Casas Conjugadas' },
  { label: 'Multifamiliar Edificação Elevada', value: 'Multifamiliar Edificação Elevada' },
  { label: 'Oficina', value: 'Oficina' },
  { label: 'Ônibus ou Micro-Ônibus', value: 'Ônibus ou Micro-Ônibus' },
  { label: 'Outro', value: 'Outro' },
  { label: 'Pessoa em Local de Difícil Acesso (Trilha/Montanha/Caverna)', value: 'Pessoa em Local de Difícil Acesso (Trilha/Montanha/Caverna)' },
  { label: 'Pessoa Ilhada', value: 'Pessoa Ilhada' },
  { label: 'Preso em Elevador', value: 'Preso em Elevador' },
  { label: 'Preso em Ferragem de Veículo', value: 'Preso em Ferragem de Veículo' },
  { label: 'Problemas Cardíacos', value: 'Problemas Cardíacos' },
  { label: 'Protesto', value: 'Protesto' },
  { label: 'Queda da Própria Altura', value: 'Queda da Própria Altura' },
  { label: 'Queda de Árvore sobre Imóveis', value: 'Queda de Árvore sobre Imóveis' },
  { label: 'Queda de Bicicleta', value: 'Queda de Bicicleta' },
  { label: 'Queda de Moto', value: 'Queda de Moto' },
  { label: 'Queda de Nível Abaixo de 2M', value: 'Queda de Nível Abaixo de 2M' },
  { label: 'Queda de Nível Acima de 2M', value: 'Queda de Nível Acima de 2M' },
  { label: 'Resgate Aquático', value: 'Resgate Aquático' },
  { label: 'Silvestre Cobra', value: 'Silvestre Cobra' },
  { label: 'Silvestre Jacaré', value: 'Silvestre Jacaré' },
  { label: 'Silvestre Onça', value: 'Silvestre Onça' },
  { label: 'Silvestre Outro', value: 'Silvestre Outro' },
  { label: 'Supermercado', value: 'Supermercado' },
  { label: 'Tentativa de Suicídio', value: 'Tentativa de Suicídio' },
  { label: 'Têxtil', value: 'Têxtil' },
  { label: 'Unifamiliar Casa Residência', value: 'Unifamiliar Casa Residência' },
  { label: 'Van ou Similar', value: 'Van ou Similar' }
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