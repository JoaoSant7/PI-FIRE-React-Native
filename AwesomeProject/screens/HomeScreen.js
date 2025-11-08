// screens/HomeScreen.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  // Funções para os botões da barra inferior
  const handleConfiguracoes = () => {
    // navigation.navigate('Configuracoes');
    alert('Abrindo Configurações');
  };

  const handleInicio = () => {
    // Já está na tela inicial, pode ser usado para recarregar ou scroll para topo
    alert('Você já está na tela inicial');
  };

  const handleUsuario = () => {
    // navigation.navigate('Perfil');
    alert('Abrindo Perfil do Usuário');
  };

  // Funções para os botões principais (se quiser adicionar depois)
  const handleDashboard = () => {
    // navigation.navigate('Dashboard');
    alert('Abrindo Dashboard');
  };

  const handleListarOcorrencias = () => {
    // navigation.navigate('ListaOcorrencias');
    alert('Abrindo Lista de Ocorrências');
  };

  const handleRegistrarOcorrencia = () => {
    // navigation.navigate('NovaOcorrencia');
    alert('Abrindo Registro de Nova Ocorrência');
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

      {/* Barra Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={handleConfiguracoes}
        >
          <Icon name="settings" size={24} color="#f8f8f8" />
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={handleInicio}
        >
          <Icon name="home" size={24} color="#f8f8f8" />
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={handleUsuario}
        >
          <Icon name="person" size={24} color="#f8f8f8" />
          <Text style={styles.navText}>Usuário</Text>
        </TouchableOpacity>
      </View>
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
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    alignItems: 'center',
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
    // Removida a sombra conforme solicitado
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#bc010c',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bc010c',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: '#f8f8f8',
    fontWeight: '500',
    marginTop: 5, // Adicionado espaçamento entre ícone e texto
  },
});