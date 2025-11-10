// screens/DashboardScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={styles.placeholder} />
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#bc010c',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 20,
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