// contexts/OcorrenciasContext.js
import React, { createContext, useContext, useState } from 'react';

const OcorrenciasContext = createContext();

export const OcorrenciasProvider = ({ children }) => {
  const [ocorrencias, setOcorrencias] = useState([]);

  // ✅ CORREÇÃO - Função adicionarOcorrencia definida corretamente
  const adicionarOcorrencia = (ocorrencia) => {
    const novaOcorrencia = {
      ...ocorrencia,
      id: ocorrencia.id || `ocorrencia_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      dataRegistro: new Date().toISOString(),
      // Garantir que fotos seja sempre um array
      fotos: ocorrencia.fotos || (ocorrencia.foto ? [ocorrencia.foto.uri] : [])
    };
    
    setOcorrencias(prev => [novaOcorrencia, ...prev]);
    return Promise.resolve(novaOcorrencia);
  };

  // ✅ CORREÇÃO - Incluir a função no value do contexto
  const value = {
    ocorrencias,
    adicionarOcorrencia,
    // incluir outras funções se necessário
  };

  return (
    <OcorrenciasContext.Provider value={value}>
      {children}
    </OcorrenciasContext.Provider>
  );
};

export const useOcorrenciasContext = () => {
  const context = useContext(OcorrenciasContext);
  if (!context) {
    throw new Error('useOcorrenciasContext deve ser usado dentro de OcorrenciasProvider');
  }
  return context;
};