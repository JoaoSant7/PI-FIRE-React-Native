import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";

// Import dos estilos e hook de escala de fonte
import styles, { createUsuarioStyles } from "../styles/UsuarioStyles";
import { useFontScale } from "../hooks/useFontScale";

// Componente reutilizável para as linhas de informação (sem ícones)
const InfoRow = ({ label, value, dynamicStyles }) => (
  <View style={dynamicStyles.infoRow}>
    <Text style={dynamicStyles.infoLabel}>{label}</Text>
    <Text style={dynamicStyles.infoValue}>{value}</Text>
  </View>
);

export default function UsuarioScreen({ navigation, route }) {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createUsuarioStyles(scaleFont), [scaleFont]);

  // Dados do usuário (em uma aplicação real, viriam do contexto ou API)
  const userData = {
    nome: "Carlos Silva",
    idade: 34,
    anoNascimento: 1990,
    tipoSanguineo: "O+",
    batalhao: "5º Batalhão de Bombeiros Militar",
    email: route.params?.email || "usuario@bombeiros.gov.br",
    matricula: "BM-2023-04567",
    funcao: "Sargento",
    telefone: "(11) 99999-9999",
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair da sua conta? Você será desconectado e voltará para a tela de login.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => {
            // Navega para a tela de login e reseta a stack de navegação
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={dynamicStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#bc010c" />

      <ScrollView style={dynamicStyles.scrollContent}>
        {/* Nome e Função do Usuário */}
        <View style={dynamicStyles.userInfoHeader}>
          <Text style={dynamicStyles.userName}>{userData.nome}</Text>
          <Text style={dynamicStyles.userRank}>{userData.funcao}</Text>
        </View>

        {/* Informações Pessoais */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Informações Pessoais</Text>

          <InfoRow label="Nome Completo" value={userData.nome}  dynamicStyles={dynamicStyles} />
          <InfoRow label="Idade" value={`${userData.idade} anos`}  dynamicStyles={dynamicStyles} />
          <InfoRow
            label="Ano de Nascimento"
            value={userData.anoNascimento.toString()}
            dynamicStyles={dynamicStyles}
          />
          <InfoRow label="Tipo Sanguíneo" value={userData.tipoSanguineo}  dynamicStyles={dynamicStyles} />
          <InfoRow label="Matrícula" value={userData.matricula}  dynamicStyles={dynamicStyles} />
        </View>

        {/* Informações Profissionais */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Informações Profissionais</Text>

          <InfoRow label="Batalhão" value={userData.batalhao}  dynamicStyles={dynamicStyles} />
          <InfoRow label="Função" value={userData.funcao}  dynamicStyles={dynamicStyles} />
        </View>

        {/* Contato */}
        <View style={dynamicStyles.section}>
          <Text style={dynamicStyles.sectionTitle}>Contato</Text>

          <InfoRow label="E-mail" value={userData.email}  dynamicStyles={dynamicStyles} />
          <InfoRow label="Telefone" value={userData.telefone}  dynamicStyles={dynamicStyles} />
        </View>

        {/* Botão Sair */}
        <View style={dynamicStyles.logoutSection}>
          <TouchableOpacity style={dynamicStyles.logoutButton} onPress={handleLogout}>
            <Text style={dynamicStyles.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
