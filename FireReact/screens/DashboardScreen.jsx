// screens/DashboardScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import BottomNav from '../components/BottomNav';

export default function DashboardScreen({ navigation }) {
  
  const handleConfiguracoes = () => {
    navigation.navigate('Configuracoes'); // Corrigido: 'Configuracoes'
  };

  const handleInicio = () => {
    navigation.navigate('Home'); // Corrigido: 'Home'
  };

  const handleUsuario = () => {
    navigation.navigate('Usuario'); // Corrigido: 'Usuario'
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      <ScrollView style={styles.content}>
        <View style={styles.placeholderSection}>
          <Icon name="dashboard" size={80} color="#bc010c" />
          <Text style={styles.placeholderTitle}>Dashboard</Text>
          <Text style={styles.placeholderText}>
            Aqui serão exibidos os gráficos e estatísticas das ocorrências
          </Text>
        </View>

        {/* Cards de estatísticas placeholder */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="warning" size={30} color="#bc010c" />
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Ocorrências Hoje</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="check-circle" size={30} color="#4CAF50" />
            <Text style={styles.statNumber}>18</Text>
            <Text style={styles.statLabel}>Finalizadas</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="schedule" size={30} color="#FF9800" />
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Em Andamento</Text>
          </View>
          
          <View style={styles.statCard}>
            <Icon name="group" size={30} color="#2196F3" />
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Agentes Ativos</Text>
          </View>
        </View>
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

// ... (os estilos permanecem os mesmos)

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
    marginBottom: 70, // Adicione esta margem para evitar que o conteúdo fique atrás da BottomNav
  },
  placeholderSection: {
    alignItems: 'center',
    paddingVertical: 40,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
});