// screens/HomeScreen.jsx
import React, { useLayoutEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../components/BottomNav";
import { useFontScale } from "../hooks/useFontScale";

// Import dos estilos
import styles, { createHomeStyles } from "../styles/HomeStyles";

export default function HomeScreen({ navigation }) {
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createHomeStyles(scaleFont), [scaleFont]);

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

  // ADICIONE ESTA FUNÇÃO PARA LOCALIZAÇÃO
  const handleLocalizacao = () => {
    navigation.navigate("Localizacao");
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
        case "localizacao": // ADICIONE ESTE CASE
          return [styles.button, styles.localizacao];
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
        <View style={dynamicStyles.buttonContent}>
          <MaterialCommunityIcons name={iconName} size={32} color="#fff" />
          <Text style={dynamicStyles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      {/* Conteúdo Principal */}
      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.sectionTitle}>O que você deseja acessar?</Text>

        <View style={dynamicStyles.buttonsContainer}>
          {/* Primeira linha: Dashboard e Listar Ocorrências */}
          <View style={dynamicStyles.buttonRow}>
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
          </View>

          {/* Segunda linha: Geolocalização (esquerda) e Registrar (direita) */}
          <View style={dynamicStyles.buttonRow}>
            <ModernButton
              title="Geolocalização"
              type="localizacao"
              onPress={handleLocalizacao}
              iconName="map-marker"
            />

            <ModernButton
              title="Registrar Nova Ocorrência"
              type="registrar"
              onPress={handleRegistrarOcorrencia}
              iconName="plus-circle"
            />
          </View>
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
