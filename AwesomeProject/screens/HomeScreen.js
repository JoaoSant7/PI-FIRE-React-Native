// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import BottomNav from '../components/BottomNav'; // Importe o BottomNav

export default function HomeScreen({ navigation }) {
  // Funções para os botões da barra inferior
  const handleConfiguracoes = () => {
    navigation.navigate('Configuracoes');
  };

  const handleInicio = () => {
    // Já está na tela inicial, pode ser usado para recarregar ou scroll para topo
    alert('Você já está na tela inicial');
  };

  const handleUsuario = () => {
    navigation.navigate('Usuario', { email: 'email_do_usuario@exemplo.com' });
  };

  // Funções para os botões principais
  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleListarOcorrencias = () => {
    navigation.navigate('ListarOcorrencias');
  };

  const handleRegistrarOcorrencia = () => {
    navigation.navigate('NovaOcorrencia');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      {/* Header Vermelho */}
      <View style={styles.header}>
        <Text style={styles.fireTitle}>Início</Text>
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você deseja acessar?</Text>
        
        {/* Botões de Acesso */}
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleDashboard}
        >
          <Text style={styles.menuButtonText}>Dashboard</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleListarOcorrencias}
        >
          <Text style={styles.menuButtonText}>Listar Ocorrências</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={handleRegistrarOcorrencia}
        >
          <Text style={styles.menuButtonText}>Registrar Nova Ocorrência</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Inferior - Agora usando o componente BottomNav */}
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
  header: {
    backgroundColor: '#bc010c',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
    marginBottom: 70, // Adicione esta margem para evitar que o conteúdo fique atrás da BottomNav
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 50,
    textAlign: 'center',
  },
  menuButton: {
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderColor: '#bc010c',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000ff',
  },
});