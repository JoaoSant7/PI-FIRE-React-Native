// screens/ConfiguracoesScreen.jsx
import React from "react";
import { StyleSheet, View, Switch, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import ScaledText from "../components/ScaledText";
import { useSettings } from "../contexts/SettingsContext";

export default function ConfiguracoesScreen() {
  const { settings, updateSetting, loading } = useSettings();

  if (loading || !settings) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#bc010c" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <ScaledText style={styles.title}>Configurações</ScaledText>

        <View style={styles.section}>
          <ScaledText style={styles.sectionTitle}>Notificações</ScaledText>
          <View style={styles.switchContainer}>
            <ScaledText style={styles.switchText}>Notificações Gerais</ScaledText>
            <Switch
              onValueChange={v => updateSetting('notifications', v)}
              value={settings.notifications}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ScaledText style={styles.sectionTitle}>Aparência</ScaledText>
          <View style={styles.switchContainer}>
            <ScaledText style={styles.switchText}>Modo Escuro</ScaledText>
            <Switch
              onValueChange={v => updateSetting('darkMode', v)}
              value={settings.darkMode}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ScaledText style={styles.sectionTitle}>Som e Feedback</ScaledText>
          <View style={styles.switchContainer}>
            <ScaledText style={styles.switchText}>Som de Notificações</ScaledText>
            <Switch
              onValueChange={v => updateSetting('sound', v)}
              value={settings.sound}
            />
          </View>
          <View style={styles.switchContainer}>
            <ScaledText style={styles.switchText}>Vibração</ScaledText>
            <Switch
              onValueChange={v => updateSetting('vibration', v)}
              value={settings.vibration}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ScaledText style={styles.sectionTitle}>Acessibilidade</ScaledText>
          <View style={styles.switchContainer}>
            <ScaledText style={styles.switchText}>Tamanho da Fonte</ScaledText>
            <View style={styles.fontOptions}>
              <TouchableOpacity
                style={[styles.fontOption, settings.fontScale === 1 && styles.fontOptionActive]}
                onPress={() => updateSetting('fontScale', 1)}
              >
                <ScaledText style={[styles.fontOptionText, settings.fontScale === 1 && styles.fontOptionTextActive]}>P</ScaledText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fontOption, settings.fontScale === 1.2 && styles.fontOptionActive]}
                onPress={() => updateSetting('fontScale', 1.2)}
              >
                <ScaledText style={[styles.fontOptionText, settings.fontScale === 1.2 && styles.fontOptionTextActive]}>M</ScaledText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.fontOption, settings.fontScale === 1.4 && styles.fontOptionActive]}
                onPress={() => updateSetting('fontScale', 1.4)}
              >
                <ScaledText style={[styles.fontOptionText, settings.fontScale === 1.4 && styles.fontOptionTextActive]}>G</ScaledText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#bc010c",
    marginBottom: 30,
    textAlign: "center",
  },
  section: { marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  switchText: { fontSize: 16, color: "#333" },
  fontOptions: { flexDirection: 'row' },
  fontOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 6,
    backgroundColor: 'transparent',
  },
  fontOptionActive: {
    backgroundColor: '#bc010c',
  },
  fontOptionText: { fontSize: 14, color: '#333' },
  fontOptionTextActive: { color: '#fff', fontWeight: '600' },
});