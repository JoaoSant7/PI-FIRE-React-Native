// screens/HomeScreen.jsx
import React, { useLayoutEffect } from "react"; // Adicione o useLayoutEffect
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useTheme } from "../contexts/ThemeContext";

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();

  // Adicione este useLayoutEffect para configurar o header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Configuracoes")}
          style={{ marginRight: 15 }}
        >
          <MaterialCommunityIcons name="cog" size={24} color={colors.textOnPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

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
          return [styles.button, styles.dashboard, { backgroundColor: colors.info }];
        case "listar":
          return [styles.button, styles.listar, { backgroundColor: colors.warning }];
        case "registrar":
          return [styles.button, styles.registrar, { backgroundColor: colors.primary }];
        default:
          return [styles.button, styles.dashboard, { backgroundColor: colors.info }];
      }
    };

    return (
      <TouchableOpacity
        style={[...getButtonStyle(), { shadowColor: colors.shadowColor }]}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <MaterialCommunityIcons name={iconName} size={32} color={colors.textOnPrimary} />
          <Text style={[styles.buttonText, { color: colors.textOnPrimary }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>O que você deseja acessar?</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  // Estilos para os botões modernos
  button: {
    width: "48%", // Dois botões por linha com espaçamento
    height: 140,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 6,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  buttonContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  dashboard: {},
  listar: {},
  registrar: {},
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
    marginTop: 12,
  },
});
