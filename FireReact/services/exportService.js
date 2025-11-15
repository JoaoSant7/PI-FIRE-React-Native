// services/exportService.js
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

// Função auxiliar para obter informações formatadas conforme Detalhes da Ocorrência
const getOcorrenciaInfo = (ocorrencia) => {
  // Formatar data e hora
  const formatarDataHora = (dataHoraString) => {
    if (!dataHoraString) return "Não informado";
    try {
      const data = new Date(dataHoraString);
      if (isNaN(data.getTime())) {
        return "Não informado";
      }
      return data.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch (error) {
      return "Não informado";
    }
  };

  // Função para formatar hora (aceita tanto string quanto Date)
  const formatarHora = (hora) => {
    if (!hora) return "Não informado";
    
    // Se já for uma string no formato HH:MM:SS
    if (typeof hora === 'string' && hora.match(/^\d{1,2}:\d{2}:\d{2}$/)) {
      return hora;
    }
    
    // Se for um objeto Date
    if (hora instanceof Date) {
      const hours = String(hora.getHours()).padStart(2, '0');
      const minutes = String(hora.getMinutes()).padStart(2, '0');
      const seconds = String(hora.getSeconds()).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
    
    return "Não informado";
  };

  return {
    // Dados Internos
    dataHora: formatarDataHora(ocorrencia.dataHora || ocorrencia.data || ocorrencia.dataCriacao),
    numeroAviso: ocorrencia.numeroAviso || ocorrencia.numero || ocorrencia.aviso || "Não informado",
    diretoria: ocorrencia.diretoria || ocorrencia.diretoriaRegiao || "Não informado",
    grupamento: ocorrencia.grupamento || ocorrencia.unidade || ocorrencia.equipe || "Não informado",
    pontoBase: ocorrencia.pontoBase || ocorrencia.base || "Não informado",

    // Ocorrência - HORÁRIOS CORRIGIDOS
    natureza: ocorrencia.natureza || ocorrencia.tipo || "Não informado",
    grupoOcorrencia: ocorrencia.grupoOcorrencia || ocorrencia.grupo || "Não informado",
    subgrupoOcorrencia: ocorrencia.subgrupoOcorrencia || ocorrencia.subgrupo || "Não informado",
    situacao: ocorrencia.situacao || ocorrencia.status || "Não informado",
    horaSaidaQuartel: formatarHora(ocorrencia.horaSaidaQuartel),
    horaChegadaLocal: formatarHora(ocorrencia.horaChegadaLocal || ocorrencia.horaLocal),
    horaSaidaLocal: formatarHora(ocorrencia.horaSaidaLocal),
    vitimaSocorridaSamu: ocorrencia.vitimaSocorridaSamu || ocorrencia.samu || ocorrencia.vitimaSamu || "Não",

    // Informações da Vítima
    vitimaEnvolvida: ocorrencia.vitimaEnvolvida || ocorrencia.vitima || "Não",
    sexo: ocorrencia.sexo || ocorrencia.genero || "Não informado",
    idade: ocorrencia.idade || "Não informado",
    classificacao: ocorrencia.classificacao || ocorrencia.tipoVitima || "Não informado",
    destino: ocorrencia.destino || ocorrencia.localDestino || "Não informado",

    // Viatura e Acionamento
    viaturaEmpregada: ocorrencia.viaturaEmpregada || ocorrencia.viatura || ocorrencia.veiculo || "Não informado",
    numeroViatura: ocorrencia.numeroViatura || ocorrencia.numeroViatura || ocorrencia.viaturaNumero || "Não informado",
    formaAcionamento: ocorrencia.formaAcionamento || ocorrencia.acionamento || ocorrencia.tipoAcionamento || "Não informado",
    localAcionamento: ocorrencia.localAcionamento || ocorrencia.origemAcionamento || "Não informado",

    // Endereço da Ocorrência
    municipio: ocorrencia.municipio || ocorrencia.cidade || "Não informado",
    regiao: ocorrencia.regiao || ocorrencia.zona || "Não informado",
    bairro: ocorrencia.bairro || "Não informado",
    tipoLogradouro: ocorrencia.tipoLogradouro || ocorrencia.tipoVia || "Não informado",
    ais: ocorrencia.ais || ocorrencia.area || "Não informado",
    logradouro: ocorrencia.logradouro || ocorrencia.endereco || ocorrencia.rua || "Não informado",
    latitude: ocorrencia.latitude || ocorrencia.lat || "Não informado",
    longitude: ocorrencia.longitude || ocorrencia.lng || ocorrencia.lon || "Não informado",

    // Informações adicionais para identificação
    id: ocorrencia.id || ocorrencia._id || "N/A",
    descricao: ocorrencia.descricao || ocorrencia.observacao || "Sem descrição",
  };
};

// Serviço para exportar CSV
export const exportToCSV = async (occurrences) => {
  try {
    // Cabeçalhos completos do CSV baseados na estrutura de detalhes
    const headers = 'ID,DataHora,Numero Aviso,Diretoria,Grupamento,Ponto Base,Natureza,Grupo Ocorrencia,Subgrupo Ocorrencia,Situacao,Hora Saida Quartel,Hora Chegada Local,Hora Saida Local,Vitima Socorrida Samu,Vitima Envolvida,Sexo,Idade,Classificacao,Destino,Viatura Empregada,Numero Viatura,Forma Acionamento,Local Acionamento,Municipio,Regiao,Bairro,Tipo Logradouro,AIS,Logradouro,Latitude,Longitude,Descricao\n';
    
    // Dados completos das ocorrências
    const rows = occurrences.map(occ => {
      const info = getOcorrenciaInfo(occ);
      return `"${info.id}","${info.dataHora}","${info.numeroAviso}","${info.diretoria}","${info.grupamento}","${info.pontoBase}","${info.natureza}","${info.grupoOcorrencia}","${info.subgrupoOcorrencia}","${info.situacao}","${info.horaSaidaQuartel}","${info.horaChegadaLocal}","${info.horaSaidaLocal}","${info.vitimaSocorridaSamu}","${info.vitimaEnvolvida}","${info.sexo}","${info.idade}","${info.classificacao}","${info.destino}","${info.viaturaEmpregada}","${info.numeroViatura}","${info.formaAcionamento}","${info.localAcionamento}","${info.municipio}","${info.regiao}","${info.bairro}","${info.tipoLogradouro}","${info.ais}","${info.logradouro}","${info.latitude}","${info.longitude}","${info.descricao}"`;
    }).join('\n');
    
    const csvContent = headers + rows;
    
    // Nome do arquivo
    const fileName = `ocorrencias_bombeiros_${Date.now()}.csv`;
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    
    // Salvar arquivo
    await FileSystem.writeAsStringAsync(fileUri, csvContent, {
      encoding: FileSystem.EncodingType.UTF8
    });
    
    // Compartilhar arquivo
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    }
    
    return fileUri;
  } catch (error) {
    console.error('Erro ao exportar CSV:', error);
    throw error;
  }
};

// Cores de fallback (tema claro) usadas quando nenhum tema é informado
const DEFAULT_EXPORT_COLORS = {
  primary: '#D32F2F',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  textOnPrimary: '#FFFFFF',
  border: '#E0E0E0',
  divider: '#EEEEEE',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};

// Serviço para exportar PDF - LAYOUT SIMPLIFICADO (aceita `colors`)
export const exportToPDF = async (occurrences, colors = DEFAULT_EXPORT_COLORS) => {
  try {
    // HTML para o PDF - LAYOUT SIMPLIFICADO
    const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 15px; 
              line-height: 1.4;
              color: ${colors.text};
              background-color: ${colors.background};
              font-size: 10px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 15px;
              border-bottom: 1px solid ${colors.border};
              padding-bottom: 8px;
            }
            .header h1 { 
              color: ${colors.text}; 
              margin: 0;
              font-size: 14px;
              font-weight: bold;
            }
            .header .subtitle {
              color: ${colors.textSecondary};
              font-size: 9px;
              margin-top: 2px;
            }
            .occurrence { 
              margin: 10px 0;
              page-break-inside: avoid;
            }
            .occurrence-header {
              background-color: ${colors.surface};
              padding: 6px 8px;
              font-weight: bold;
              border: 1px solid ${colors.border};
              color: ${colors.text};
              font-size: 11px;
              margin-bottom: 8px;
            }
            .section {
              margin: 8px 0;
              border: 1px solid ${colors.border};
            }
            .section-title {
              background-color: ${colors.surface};
              padding: 5px 8px;
              font-weight: bold;
              border-bottom: 1px solid ${colors.border};
              color: ${colors.text};
              font-size: 10px;
            }
            .section-content {
              padding: 6px 8px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 4px;
            }
            .info-item {
              margin: 2px 0;
              display: flex;
            }
            .info-label {
              font-weight: bold;
              color: ${colors.textSecondary};
              font-size: 9px;
              min-width: 120px;
            }
            .info-value {
              color: ${colors.text};
              font-size: 9px;
              flex: 1;
            }
            .full-width {
              grid-column: 1 / -1;
            }
            .description-box {
              background-color: ${colors.card};
              padding: 6px;
              border: 1px solid ${colors.border};
              margin: 4px 0;
              font-size: 9px;
              white-space: pre-line;
              color: ${colors.text};
            }
            .footer {
              text-align: center;
              margin-top: 15px;
              color: ${colors.textSecondary};
              font-size: 8px;
              border-top: 1px solid ${colors.border};
              padding-top: 8px;
            }
            @media print {
              body { margin: 10px; }
              .occurrence { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RELATÓRIO DE OCORRÊNCIAS - CORPO DE BOMBEIROS</h1>
            <div class="subtitle">
              Gerado em: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')} | 
              Total: ${occurrences.length} ocorrência(s)
            </div>
          </div>

          ${occurrences.map((occ, index) => {
            const info = getOcorrenciaInfo(occ);
            
            return `
              <div class="occurrence">
                <div class="occurrence-header">
                  OCORRÊNCIA #${info.id} - ${info.natureza}
                </div>

                <!-- Dados Internos -->
                <div class="section">
                  <div class="section-title">DADOS INTERNOS</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Data e Hora:</div>
                        <div class="info-value">${info.dataHora}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Número do Aviso:</div>
                        <div class="info-value">${info.numeroAviso}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Diretoria:</div>
                        <div class="info-value">${info.diretoria}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Grupamento:</div>
                        <div class="info-value">${info.grupamento}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Ponto Base:</div>
                        <div class="info-value">${info.pontoBase}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Ocorrência -->
                <div class="section">
                  <div class="section-title">OCORRÊNCIA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Natureza:</div>
                        <div class="info-value">${info.natureza}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Grupo da Ocorrência:</div>
                        <div class="info-value">${info.grupoOcorrencia}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Subgrupo da Ocorrência:</div>
                        <div class="info-value">${info.subgrupoOcorrencia}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Situação:</div>
                        <div class="info-value">${info.situacao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Saída do Quartel:</div>
                        <div class="info-value">${info.horaSaidaQuartel}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Chegada Local:</div>
                        <div class="info-value">${info.horaChegadaLocal}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Hora Saída Local:</div>
                        <div class="info-value">${info.horaSaidaLocal}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Vítima Socorrida pelo Samu:</div>
                        <div class="info-value">${info.vitimaSocorridaSamu}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Informações da Vítima -->
                <div class="section">
                  <div class="section-title">INFORMAÇÕES DA VÍTIMA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Vítima Envolvida:</div>
                        <div class="info-value">${info.vitimaEnvolvida}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Sexo:</div>
                        <div class="info-value">${info.sexo}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Idade:</div>
                        <div class="info-value">${info.idade}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Classificação:</div>
                        <div class="info-value">${info.classificacao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Destino:</div>
                        <div class="info-value">${info.destino}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Viatura e Acionamento -->
                <div class="section">
                  <div class="section-title">VIATURA E ACIONAMENTO</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Viatura Empregada:</div>
                        <div class="info-value">${info.viaturaEmpregada}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Número da Viatura:</div>
                        <div class="info-value">${info.numeroViatura}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Forma de Acionamento:</div>
                        <div class="info-value">${info.formaAcionamento}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Local do Acionamento:</div>
                        <div class="info-value">${info.localAcionamento}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Endereço da Ocorrência -->
                <div class="section">
                  <div class="section-title">ENDEREÇO DA OCORRÊNCIA</div>
                  <div class="section-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Município:</div>
                        <div class="info-value">${info.municipio}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Região:</div>
                        <div class="info-value">${info.regiao}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Bairro:</div>
                        <div class="info-value">${info.bairro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Tipo de Logradouro:</div>
                        <div class="info-value">${info.tipoLogradouro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">AIS:</div>
                        <div class="info-value">${info.ais}</div>
                      </div>
                      <div class="info-item full-width">
                        <div class="info-label">Logradouro:</div>
                        <div class="info-value">${info.logradouro}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Latitude:</div>
                        <div class="info-value">${info.latitude}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Longitude:</div>
                        <div class="info-value">${info.longitude}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Descrição -->
                <div class="section">
                  <div class="section-title">DESCRIÇÃO</div>
                  <div class="section-content">
                    <div class="description-box">
                      ${info.descricao}
                    </div>
                  </div>
                </div>
              </div>
              ${index < occurrences.length - 1 ? '<div style="height: 10px;"></div>' : ''}
            `;
          }).join('')}

          <div class="footer">
            Documento gerado automaticamente pelo Sistema de Ocorrências do Corpo de Bombeiros
          </div>
        </body>
      </html>
    `;
    
    // Gerar PDF
    const { uri } = await Print.printToFileAsync({ 
      html,
      base64: false
    });
    
    // Compartilhar PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Relatório de Ocorrências - Bombeiros'
      });
    }
    
    return uri;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw error;
  }
};