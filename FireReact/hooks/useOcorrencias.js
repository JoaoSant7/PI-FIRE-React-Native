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
      console.log('🔄 Iniciando carregamento de dados locais...');
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      
      if (dataString) {
        const data = JSON.parse(dataString);
        console.log('✅ Dados carregados:', data.ocorrencias?.length || 0, 'ocorrências');
        console.log('📋 Primeira ocorrência:', data.ocorrencias?.[0]);
        setOcorrencias(data.ocorrencias || []);
        setLastSync(data.timestamp);
      } else {
        console.log('⚠️ Nenhum dado encontrado no AsyncStorage');
        // Dados iniciais vazios se não existir nada
        const dadosIniciais = {
          ocorrencias: [],
          timestamp: new Date().toISOString()
        };
        await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(dadosIniciais));
        setOcorrencias([]);
        setLastSync(dadosIniciais.timestamp);
      }
      setError(null);
    } catch (err) {
      console.error('❌ Erro ao carregar dados locais:', err);
      setError('Erro ao carregar dados');
      setOcorrencias([]);
    } finally {
      setLoading(false);
    }
  }, []); // Sem dependências

  // Adicionar nova ocorrência
  const adicionarOcorrencia = useCallback(async (novaOcorrencia) => {
    try {
      console.log('➕ Adicionando nova ocorrência:', novaOcorrencia);
      
      const ocorrenciaCompleta = {
        ...novaOcorrencia,
        id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
        sincronizado: false
      };

      // Carregar dados atuais
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      const dataAtual = dataString ? JSON.parse(dataString) : { ocorrencias: [] };
      
      // Adicionar nova ocorrência
      const novasOcorrencias = [...dataAtual.ocorrencias, ocorrenciaCompleta];
      const novoData = {
        ocorrencias: novasOcorrencias,
        timestamp: new Date().toISOString()
      };
      
      // Salvar localmente
      await AsyncStorage.setItem(OCORRENCIAS_STORAGE_KEY, JSON.stringify(novoData));
      
      // Atualizar estado
      setOcorrencias(novasOcorrencias);
      setLastSync(novoData.timestamp);
      
      console.log('✅ Ocorrência adicionada com sucesso:', ocorrenciaCompleta.id);
      console.log('📊 Total de ocorrências agora:', novasOcorrencias.length);
      
      return ocorrenciaCompleta;
    } catch (err) {
      console.error('❌ Erro ao adicionar ocorrência:', err);
      setError('Erro ao salvar ocorrência');
      throw err;
    }
  }, []);

  // Atualizar dados (pull to refresh)
  const atualizarDados = useCallback(async () => {
    console.log('🔄 Atualizando dados...');
    setRefreshing(true);
    setError(null);
    
    try {
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      
      if (dataString) {
        const data = JSON.parse(dataString);
        console.log('✅ Dados atualizados:', data.ocorrencias?.length || 0, 'ocorrências');
        setOcorrencias(data.ocorrencias || []);
        setLastSync(data.timestamp);
      }
    } catch (err) {
      console.error('❌ Erro ao atualizar dados:', err);
      setError('Erro ao atualizar dados');
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Recarregar dados (forçar reload)
  const recarregarDados = useCallback(async () => {
    console.log('🔄 Recarregando dados...');
    setLoading(true);
    setError(null);
    
    try {
      const dataString = await AsyncStorage.getItem(OCORRENCIAS_STORAGE_KEY);
      
      if (dataString) {
        const data = JSON.parse(dataString);
        console.log('✅ Dados recarregados:', data.ocorrencias?.length || 0, 'ocorrências');
        setOcorrencias(data.ocorrencias || []);
        setLastSync(data.timestamp);
      }
    } catch (err) {
      console.error('❌ Erro ao recarregar dados:', err);
      setError('Erro ao recarregar dados');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar dados iniciais ao montar o componente
  useEffect(() => {
    console.log('🚀 Hook useOcorrencias montado, carregando dados iniciais...');
    carregarDadosLocais();
  }, [carregarDadosLocais]);

  // Debug: Log quando ocorrencias mudar
  useEffect(() => {
    console.log('📊 Estado ocorrencias atualizado:', ocorrencias.length, 'itens');
    if (ocorrencias.length > 0) {
      console.log('📋 Status das ocorrências:', ocorrencias.map(o => o.status));
    }
  }, [ocorrencias]);

  // Adicione isso temporariamente dentro do DashboardScreen, antes do return
useEffect(() => {
  const debugStorage = async () => {
    try {
      // Lista TODAS as chaves do AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      console.log('🔑 Todas as chaves no AsyncStorage:', keys);
      
      // Pega os valores de cada chave
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(`📦 ${key}:`, value);
      }
    } catch (error) {
      console.error('Erro ao debugar storage:', error);
    }
  };
  
  debugStorage();
}, []);

  return {
    ocorrencias,
    loading,
    error,
    lastSync,
    refreshing,
    atualizarDados,
    recarregarDados,
    adicionarOcorrencia
  };
};