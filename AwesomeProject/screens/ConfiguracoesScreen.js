import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native';

export default function ConfiguracoesScreen() {
  const [notificacoesGerais, setNotificacoesGerais] = useState(true);
  const [modoClaroEscuro, setModoClaroEscuro] = useState(false);
  const [sincAutomatica, setSincAutomatica] = useState(true);
  const [somNotificacoes, setSomNotificacoes] = useState(true);
  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);
  const [mostrarCoordenadas, setMostrarCoordenadas] = useState(false);
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(true);
  const [formatoHora, setFormatoHora] = useState(true);
  const [layoutCompacto, setLayoutCompacto] = useState(false);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Notificações Gerais</Text>
            <Switch
              onValueChange={setNotificacoesGerais}
              value={notificacoesGerais}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Modo Escuro</Text>
            <Switch
              onValueChange={setModoClaroEscuro}
              value={modoClaroEscuro}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Layout Compacto</Text>
            <Switch
              onValueChange={setLayoutCompacto}
              value={layoutCompacto}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Som e Feedback</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Som de Notificações</Text>
            <Switch
              onValueChange={setSomNotificacoes}
              value={somNotificacoes}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Vibração</Text>
            <Switch
              onValueChange={setVibracaoAtiva}
              value={vibracaoAtiva}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências de Visualização</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Mostrar Coordenadas GPS</Text>
            <Switch
              onValueChange={setMostrarCoordenadas}
              value={mostrarCoordenadas}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Mostrar Estatísticas</Text>
            <Switch
              onValueChange={setMostrarEstatisticas}
              value={mostrarEstatisticas}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Formato 24 horas</Text>
            <Switch
              onValueChange={setFormatoHora}
              value={formatoHora}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade e Dados</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Sincronização Automática</Text>
            <Switch
              onValueChange={setSincAutomatica}
              value={sincAutomatica}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#bc010c',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: {
    fontSize: 16,
    color: '#333',
  },
});