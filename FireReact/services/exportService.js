import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

// Serviço para exportar CSV
export const exportToCSV = async (occurrences) => {
  try {
    // Cabeçalhos do CSV
    const headers = 'ID,Data,Hora,Tipo,Endereço,Status,Descrição\n';
    
    // Dados das ocorrências
    const rows = occurrences.map(occ => 
      `"${occ.id}","${occ.date}","${occ.time}","${occ.type}","${occ.address}","${occ.status}","${occ.description}"`
    ).join('\n');
    
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

// Serviço para exportar PDF
export const exportToPDF = async (occurrences) => {
  try {
    // HTML para o PDF
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #d32f2f; text-align: center; }
            .occurrence { border: 1px solid #ccc; margin: 10px 0; padding: 15px; }
            .header { background-color: #f5f5f5; padding: 10px; font-weight: bold; }
            .info { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h1>Relatório de Ocorrências - Bombeiros</h1>
          <p>Data de geração: ${new Date().toLocaleDateString()}</p>
          ${occurrences.map(occ => `
            <div class="occurrence">
              <div class="header">Ocorrência #${occ.id}</div>
              <div class="info"><strong>Data:</strong> ${occ.date} ${occ.time}</div>
              <div class="info"><strong>Tipo:</strong> ${occ.type}</div>
              <div class="info"><strong>Endereço:</strong> ${occ.address}</div>
              <div class="info"><strong>Status:</strong> ${occ.status}</div>
              <div class="info"><strong>Descrição:</strong> ${occ.description}</div>
            </div>
          `).join('')}
        </body>
      </html>
    `;
    
    // Gerar PDF
    const { uri } = await Print.printToFileAsync({ html });
    
    // Compartilhar PDF
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    }
    
    return uri;
  } catch (error) {
    console.error('Erro ao exportar PDF:', error);
    throw error;
  }
};