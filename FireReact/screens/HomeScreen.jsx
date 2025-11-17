// screens/HomeScreen.jsx
import React, { useLayoutEffect } from "react"; // Adicione o useLayoutEffect
import { StyleSheet, View, TouchableOpacity } from "react-native";
import ScaledText from "../components/ScaledText";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";

// Import dos estilos
import styles from "../styles/HomeStyles";

export default function HomeScreen({ navigation }) {
  // Adicione este useLayoutEffect para configurar o header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Configuracoes")}
          style={{ marginRight: 15 }}
        >
          <MaterialCommunityIcons name="cog" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Funções para os botões da barra inferior
  const handleInicio = () => {
    // Já está na tela inicial
  };

  const handleUsuario = () => {
    navigation.navigate("Usuario", { email: "email_do_usuario@exemplo.com" });
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  // Funções para os botões principais
  const handleDashboard = () => {
    navigation.navigate("Dashboard");
  };

  const handleListarOcorrencias = () => {
    navigation.navigate("ListarOcorrencias");
  };

  const handleRegistrarOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  // Componente para botões modernos com ícones
  const ModernButton = ({ title, type, onPress, iconName }) => {
    const getButtonStyle = () => {
      switch (type) {
        case "dashboard":
          return [styles.button, styles.dashboard];
        case "listar":
          return [styles.button, styles.listar];
        case "registrar":
          return [styles.button, styles.registrar];
        default:
          return [styles.button, styles.dashboard];
      }
    };

    return (
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        activeOpacity={0.8}
      >
          <View style={styles.buttonContent}>
          <MaterialCommunityIcons name={iconName} size={32} color="#fff" />
          <ScaledText style={styles.buttonText}>{title}</ScaledText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <ScaledText style={styles.sectionTitle}>O que você deseja acessar?</ScaledText>

        <View style={styles.buttonsContainer}>
          {/* Botões de Acesso */}
          <ModernButton
            title="Dashboard"
            type="dashboard"
            onPress={handleDashboard}
            iconName="view-dashboard"
          />

          <ModernButton
            title="Listar Ocorrências"
            type="listar"
            onPress={handleListarOcorrencias}
            iconName="format-list-bulleted"
          />

          <ModernButton
            title="Registrar Nova Ocorrência"
            type="registrar"
            onPress={handleRegistrarOcorrencia}
            iconName="plus-circle"
          />
        </View>
      </View>

      {/* Barra Inferior */}
      <BottomNav
        onHomePress={handleInicio}
        onUserPress={handleUsuario}
        onNewOccurrencePress={handleNovaOcorrencia}
      />
    </SafeAreaView>
  );
}
