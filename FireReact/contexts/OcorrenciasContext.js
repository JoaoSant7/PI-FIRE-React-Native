// context/OcorrenciasContext.js
import React, { createContext, useState, useContext } from 'react';

const OcorrenciasContext = createContext();

export function OcorrenciasProvider({ children }) {
  const [ocorrencias, setOcorrencias] = useState([]); // Inicialmente vazio

  // Função para adicionar uma ocorrência
  const adicionarOcorrencia = (ocorrencia) => {
    setOcorrencias((prev) => [...prev, ocorrencia]);
  };

  return (
    <OcorrenciasContext.Provider value={{ ocorrencias, adicionarOcorrencia }}>
      {children}
    </OcorrenciasContext.Provider>
  );
}

export function useOcorrencias() {
  return useContext(OcorrenciasContext);
}