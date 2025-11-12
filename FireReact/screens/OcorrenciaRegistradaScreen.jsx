import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';

const OcorrenciaRegistradaScreen = ({ navigation }) => {
  const handleInicio = () => {
    navigation.navigate('Home');
  };

  const handleListarOcorrencias = () => {
    navigation.navigate('ListarOcorrencias');
  };

  const handleNovaOcorrencia = () => {
    navigation.navigate('NovaOcorrencia');
  };

  const handleExportarPDF = () => {
    // Lógica para exportar PDF
    Alert.alert('PDF Exportado', 'Ocorrência exportada em PDF com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Ícone de sucesso */}
          <View style={styles.successIcon}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          {/* Mensagem de sucesso */}
          <Text style={styles.successTitle}>Ocorrência Registrada com Sucesso!</Text>
          <Text style={styles.successMessage}>
            A ocorrência foi salva no sistema e está disponível para consulta.
          </Text>

          {/* Botões de ação */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={handleInicio}
            >
              <Text style={styles.buttonText}>Início</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={handleListarOcorrencias}
            >
              <Text style={styles.buttonText}>Listar Ocorrências</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.accentButton]}
              onPress={handleNovaOcorrencia}
            >
              <Text style={styles.buttonText}>Registrar Nova Ocorrência</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.pdfButton]}
              onPress={handleExportarPDF}
            >
              <Text style={styles.buttonText}>Exportar Ocorrência em PDF</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#dc3545', // Vermelho bombeiros
  },
  secondaryButton: {
    backgroundColor: '#6c757d',
  },
  accentButton: {
    backgroundColor: '#fd7e14', // Laranja bombeiros
  },
  pdfButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OcorrenciaRegistradaScreen;