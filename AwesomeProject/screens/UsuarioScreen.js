// screens/UsuarioScreen.js
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  StatusBar, 
  ScrollView,
  Alert
} from 'react-native';

export default function UsuarioScreen({ navigation, route }) {
  // Dados do usuário (em uma aplicação real, viriam do contexto ou API)
  const userData = {
    nome: 'Carlos Silva',
    idade: 34,
    anoNascimento: 1990,
    tipoSanguineo: 'O+',
    batalhao: '5º Batalhão de Bombeiros Militar',
    email: route.params?.email || 'usuario@bombeiros.gov.br',
    matricula: 'BM-2023-04567',
    funcao: 'Sargento',
    telefone: '(11) 99999-9999'
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair da sua conta? Você será desconectado e voltará para a tela de login.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: () => {
            // Navega para a tela de login e reseta a stack de navegação
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />
      
      <ScrollView style={styles.scrollContent}>
        {/* Nome e Função do Usuário */}
        <View style={styles.userInfoHeader}>
          <Text style={styles.userName}>{userData.nome}</Text>
          <Text style={styles.userRank}>{userData.funcao}</Text>
        </View>

        {/* Informações Pessoais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>
          
          <InfoRow label="Nome Completo" value={userData.nome} />
          <InfoRow label="Idade" value={`${userData.idade} anos`} />
          <InfoRow label="Ano de Nascimento" value={userData.anoNascimento.toString()} />
          <InfoRow label="Tipo Sanguíneo" value={userData.tipoSanguineo} />
          <InfoRow label="Matrícula" value={userData.matricula} />
        </View>

        {/* Informações Profissionais */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações Profissionais</Text>
          
          <InfoRow label="Batalhão" value={userData.batalhao} />
          <InfoRow label="Função" value={userData.funcao} />
        </View>

        {/* Contato */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          
          <InfoRow label="E-mail" value={userData.email} />
          <InfoRow label="Telefone" value={userData.telefone} />
        </View>

        {/* Botão Sair */}
        <View style={styles.logoutSection}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Componente reutilizável para as linhas de informação (sem ícones)
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flex: 1,
  },
  userInfoHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
    marginTop: 60,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bc010c',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'right',
  },
  logoutSection: {
    padding: 20,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#bc010c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});