// hooks/useOcorrencias.js
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OCORRENCIAS_STORAGE_KEY = '@ocorrencias_data';

export const useOcorrencias = () => {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Carregar dados do AsyncStorage
  const carregarDadosLocais = useCallback(async () => {
    try {
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      if (dataString) {
        const data = JSON.parse(dataString);
        setOcorrencias(data.ocorrencias || []);
        setLastSync(data.timestamp);
      }
    } catch (err) {
      setError('Erro ao carregar dados locais: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sincronizar com fonte externa (exemplo com fetch)
  const sincronizarComAPI = useCallback(async () => {
    try {
      // Substitua pela sua URL da API
      const response = await fetch('https://sua-api.com/ocorrencias');
      if (response.ok) {
        const dadosExternos = await response.json();
        
        // Salvar localmente
        const dataToSave = {
          ocorrencias: dadosExternos,
          timestamp: new Date().toISOString()
        };
        
        await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(dataToSave));
        setOcorrencias(dadosExternos);
        setLastSync(dataToSave.timestamp);
        setError(null);
      }
    } catch (err) {
      setError('Falha na sincronização: ' + err.message);
      // Em caso de erro, manter dados locais
      await carregarDadosLocais();
    }
  }, [carregarDadosLocais]);

  const atualizarDados = useCallback(async () => {
    setRefreshing(true);
    await sincronizarComAPI();
    setRefreshing(false);
  }, [sincronizarComAPI]);

  const recarregarDados = useCallback(async () => {
    setLoading(true);
    await sincronizarComAPI();
    setLoading(false);
  }, [sincronizarComAPI]);

  useEffect(() => {
    carregarDadosLocais();
  }, [carregarDadosLocais]);

  return {
    ocorrencias,
    loading,
    error,
    lastSync,
    refreshing,
    atualizarDados,
    recarregarDados
  };
};