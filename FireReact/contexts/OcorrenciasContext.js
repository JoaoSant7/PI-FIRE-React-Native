// contexts/OcorrenciasContext.js
import React, { createContext, useContext, useState } from 'react';
import { useOcorrencias } from '../hooks/useOcorrencias';

const OcorrenciasContext = createContext();

export const OcorrenciasProvider = ({ children }) => {
  const ocorrenciasData = useOcorrencias();

  return (
    <OcorrenciasContext.Provider value={ocorrenciasData}>
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

// context/OcorrenciasContext.js
const adicionarOcorrencia = (ocorrencia) => {
  const novaOcorrencia = {
    ...ocorrencia,
    id: ocorrencia.id || `ocorrencia_${Date.now()}`,
    // A foto já está incluída no objeto ocorrencia
  };
  
  setOcorrencias(prev => [novaOcorrencia, ...prev]);
  return Promise.resolve();
};