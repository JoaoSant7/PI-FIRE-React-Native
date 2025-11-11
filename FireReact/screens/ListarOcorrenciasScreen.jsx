// screens/ListaOcorrenciasScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav'; // Importe o BottomNav

export default function ListaOcorrenciasScreen({ navigation }) {
  // Dados placeholder para ocorrências
  const ocorrencias = [
    { id: 1, tipo: 'Incêndio', local: 'Av. Principal, 123', status: 'Em Andamento', hora: '14:30' },
    { id: 2, tipo: 'Acidente', local: 'Rua das Flores, 456', status: 'Finalizada', hora: '10:15' },
    { id: 3, tipo: 'Resgate', local: 'Praça Central', status: 'Em Andamento', hora: '16:45' },
    { id: 4, tipo: 'Incêndio', local: 'Condomínio Solar', status: 'Finalizada', hora: '08:20' },
  ];

  // Funções para a barra inferior
  const handleConfiguracoes = () => {
    navigation.navigate('Configuracoes');
  };

  const handleInicio = () => {
    navigation.navigate('Home');
  };

  const handleUsuario = () => {
    navigation.navigate('Usuario', { email: 'email_do_usuario@exemplo.com' });
  };

  const getStatusColor = (status) => {
    return status === 'Em Andamento' ? '#FF9800' : '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      <ScrollView style={styles.content}>
        <View style={styles.placeholderSection}>
          <Icon name="list" size={80} color="#bc010c" />
          <Text style={styles.placeholderTitle}>Ocorrências</Text>
          <Text style={styles.placeholderText}>
            Lista de todas as ocorrências registradas no sistema
          </Text>
        </View>

        {/* Lista de ocorrências */}
        {ocorrencias.map((ocorrencia) => (
          <TouchableOpacity key={ocorrencia.id} style={styles.ocorrenciaCard}>
            <View style={styles.ocorrenciaHeader}>
              <Text style={styles.ocorrenciaTipo}>{ocorrencia.tipo}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ocorrencia.status) }]}>
                <Text style={styles.statusText}>{ocorrencia.status}</Text>
              </View>
            </View>
            <View style={styles.ocorrenciaInfo}>
              <Icon name="location-on" size={16} color="#666" />
              <Text style={styles.ocorrenciaLocal}>{ocorrencia.local}</Text>
            </View>
            <View style={styles.ocorrenciaInfo}>
              <Icon name="access-time" size={16} color="#666" />
              <Text style={styles.ocorrenciaHora}>{ocorrencia.hora}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Barra Inferior */}
      <BottomNav
        onConfigPress={handleConfiguracoes}
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
    marginBottom: 10, // Adicione esta margem para evitar que o conteúdo fique atrás da BottomNav
  },
  placeholderSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 20,
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  ocorrenciaCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  ocorrenciaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ocorrenciaTipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ocorrenciaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ocorrenciaLocal: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  ocorrenciaHora: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});