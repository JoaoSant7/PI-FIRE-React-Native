import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

// Import dos estilos
import styles, { createOcorrenciaRegistradaStyles } from "../styles/OcorrenciaRegistradaStyles";
import { useFontScale } from "../hooks/useFontScale";

const OcorrenciaRegistradaScreen = ({ navigation }) => {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createOcorrenciaRegistradaStyles(scaleFont), [scaleFont]);
  const handleInicio = () => {
    navigation.navigate("Home");
  };

  const handleListarOcorrencias = () => {
    navigation.navigate("ListarOcorrencias");
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate("NovaOcorrencia");
  };

  const handleExportarPDF = () => {
    // Lógica para exportar PDF
    Alert.alert("PDF Exportado", "Ocorrência exportada em PDF com sucesso!");
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerstyle={dynamicStyles.scrollContent}>
        <View style={dynamicStyles.content}>
          {/* Ícone de sucesso */}
          <View style={dynamicStyles.successIcon}>
            <Text style={dynamicStyles.checkmark}>✓</Text>
          </View>

          {/* Mensagem de sucesso */}
          <Text style={dynamicStyles.successTitle}>
            Ocorrência Registrada com Sucesso!
          </Text>
          <Text style={dynamicStyles.successMessage}>
            A ocorrência foi salva no sistema e está disponível para consulta.
          </Text>

          {/* Botões de ação */}
          <View style={dynamicStyles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={handleInicio}
            >
              <Text style={dynamicStyles.buttonText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleListarOcorrencias}
            >
              <Text style={dynamicStyles.buttonText}>Listar Ocorrências</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.accentButton]}
              onPress={handleNovaOcorrencia}
            >
              <Text style={dynamicStyles.buttonText}>Registrar Nova Ocorrência</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.pdfButton]}
              onPress={handleExportarPDF}
            >
              <Text style={dynamicStyles.buttonText}>Exportar Ocorrência em PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OcorrenciaRegistradaScreen;
