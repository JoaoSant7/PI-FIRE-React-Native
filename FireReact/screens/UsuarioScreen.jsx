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
import { useTheme } from '../contexts/ThemeContext';

export default function UsuarioScreen({ navigation, route }) {
  const { colors, isDark } = useTheme();
  
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.primary} />
      
      <ScrollView style={styles.scrollContent}>
        {/* Nome e Função do Usuário */}
        <View style={[styles.userInfoHeader, { backgroundColor: colors.surface }]}>
          <Text style={[styles.userName, { color: colors.text }]}>{userData.nome}</Text>
          <Text style={[styles.userRank, { color: colors.textSecondary }]}>{userData.funcao}</Text>
        </View>

        {/* Informações Pessoais */}
        <View style={[styles.section, { borderBottomColor: colors.divider }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Informações Pessoais</Text>
          
          <InfoRow label="Nome Completo" value={userData.nome} colors={colors} />
          <InfoRow label="Idade" value={`${userData.idade} anos`} colors={colors} />
          <InfoRow label="Ano de Nascimento" value={userData.anoNascimento.toString()} colors={colors} />
          <InfoRow label="Tipo Sanguíneo" value={userData.tipoSanguineo} colors={colors} />
          <InfoRow label="Matrícula" value={userData.matricula} colors={colors} />
        </View>

        {/* Informações Profissionais */}
        <View style={[styles.section, { borderBottomColor: colors.divider }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Informações Profissionais</Text>
          
          <InfoRow label="Batalhão" value={userData.batalhao} colors={colors} />
          <InfoRow label="Função" value={userData.funcao} colors={colors} />
        </View>

        {/* Contato */}
        <View style={[styles.section, { borderBottomColor: colors.divider }]}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Contato</Text>
          
          <InfoRow label="E-mail" value={userData.email} colors={colors} />
          <InfoRow label="Telefone" value={userData.telefone} colors={colors} />
        </View>

        {/* Botão Sair */}
        <View style={styles.logoutSection}>
          <TouchableOpacity 
            style={[styles.logoutButton, { backgroundColor: colors.primary }]}
            onPress={handleLogout}
          >
            <Text style={[styles.logoutButtonText, { color: colors.textOnPrimary }]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// Componente reutilizável para as linhas de informação (sem ícones)
const InfoRow = ({ label, value, colors }) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.surface }]}>
    <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  userInfoHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    marginTop: 60,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userRank: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  logoutSection: {
    padding: 20,
    marginTop: 20,
  },
  logoutButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});